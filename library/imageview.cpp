#include "imageview.h"
#include "ui_imageview.h"

#include <QPainter>
#include <tpropertyanimation.h>
#include <QGraphicsOpacityEffect>
#include <QShortcut>
#include "imagegrid.h"
#include "imageviewsidebar.h"

struct ImageViewPrivate {
    ImageGrid* grid = nullptr;
    ImageViewSidebar* sidebar;

    tVariantAnimation* opacityAnimation = nullptr;
    tVariantAnimation* locationAnimation = nullptr;
    tVariantAnimation* sourceRectAnimation = nullptr;
    ImgDesc image;

    bool closing = false;
};

ImageView::ImageView(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::ImageView)
{
    ui->setupUi(this);

    d = new ImageViewPrivate();

    d->opacityAnimation = new tVariantAnimation();
    d->opacityAnimation->setStartValue(0.0);
    d->opacityAnimation->setEndValue(1.0);
    d->opacityAnimation->setDuration(250);
    d->opacityAnimation->setEasingCurve(QEasingCurve::OutCubic);
    connect(d->opacityAnimation, &tVariantAnimation::valueChanged, this, [=](QVariant value) {
        this->update();
    });

    d->sidebar = new ImageViewSidebar(this);

    QShortcut* escShortcut = new QShortcut(QKeySequence(Qt::Key_Escape), this, SLOT(close()));
    escShortcut->setAutoRepeat(false);

    QShortcut* nextShortcut = new QShortcut(QKeySequence(Qt::Key_Right), this, SLOT(nextImage()));
    QShortcut* prevShortcut = new QShortcut(QKeySequence(Qt::Key_Left), this, SLOT(previousImage()));
}

ImageView::~ImageView()
{
    if (d->opacityAnimation != nullptr) d->opacityAnimation->deleteLater();
    if (d->locationAnimation != nullptr) d->locationAnimation->deleteLater();
    if (d->sourceRectAnimation != nullptr) d->sourceRectAnimation->deleteLater();
    delete ui;
    delete d;
}

QWidget* ImageView::sidebar() {
    return d->sidebar;
}

void ImageView::setImageGrid(ImageGrid *grid) {
    d->grid = grid;
}

void ImageView::paintEvent(QPaintEvent *event) {
    QPainter painter(this);
    painter.setOpacity(d->opacityAnimation->currentValue().toReal());
    painter.setBrush(Qt::black);
    painter.setPen(Qt::transparent);
    painter.drawRect(0, 0, this->width(), this->height());
    painter.setOpacity(1);

    if (!d->image.isNull()) {
        painter.drawPixmap(d->locationAnimation->currentValue().toRectF(), d->image->image(), d->sourceRectAnimation->currentValue().toRectF());
    }
}

void ImageView::animateImageIn(QRectF location, QRectF sourceRect, ImgDesc image) {
    d->locationAnimation = new tVariantAnimation();
    d->locationAnimation->setDuration(250);
    d->locationAnimation->setEasingCurve(QEasingCurve::OutCubic);

    d->sourceRectAnimation = new tVariantAnimation();
    d->sourceRectAnimation->setDuration(250);
    d->sourceRectAnimation->setEasingCurve(QEasingCurve::OutCubic);

    loadImage(image);

    d->opacityAnimation->start();

    d->locationAnimation->setStartValue(location);
    d->locationAnimation->setEndValue(calculateEndRect());
    connect(d->locationAnimation, &tVariantAnimation::valueChanged, this, [=](QVariant value) {
        this->update();
    });
    d->locationAnimation->start();

    d->sourceRectAnimation->setStartValue(sourceRect);
    d->sourceRectAnimation->setEndValue(QRectF(0, 0, image->image().width(), image->image().height()));
    connect(d->sourceRectAnimation, &tVariantAnimation::valueChanged, this, [=](QVariant value) {
        this->update();
    });
    d->sourceRectAnimation->start();

    d->sidebar->show();
}

void ImageView::close() {
    emit closed();
    d->closing = true;

    QRectF endRect = calculateEndRect();
    endRect.moveTop(endRect.top() + this->height() / 8);
    d->locationAnimation->setStartValue(d->locationAnimation->currentValue());
    d->locationAnimation->setEndValue(endRect);
    d->locationAnimation->setEasingCurve(QEasingCurve::InCubic);
    d->locationAnimation->start();

    QGraphicsOpacityEffect* effect = new QGraphicsOpacityEffect();
    effect->setOpacity(1);
    this->setGraphicsEffect(effect);

    tPropertyAnimation* opacityAnimation = new tPropertyAnimation(effect, "opacity");
    opacityAnimation->setStartValue(1.0);
    opacityAnimation->setEndValue(0.0);
    opacityAnimation->setDuration(250);
    opacityAnimation->setEasingCurve(QEasingCurve::InCubic);
    connect(opacityAnimation, &tPropertyAnimation::finished, opacityAnimation, &tPropertyAnimation::deleteLater);
    connect(opacityAnimation, &tPropertyAnimation::finished, this, &ImageView::deleteLater);
    opacityAnimation->start();

    d->sidebar->hide();
}

void ImageView::resizeEvent(QResizeEvent *event) {
    if (!d->image.isNull() && !d->closing) {
        d->locationAnimation->setEndValue(calculateEndRect());
    }
}

void ImageView::mousePressEvent(QMouseEvent *event) {

}

QRectF ImageView::calculateEndRect() {
    QSizeF endSize = d->image->image().size().scaled(this->width(), this->height(), Qt::KeepAspectRatio);
    QRectF endRect;
    endRect.setSize(endSize);
    endRect.moveCenter(QPointF(this->width() / 2, this->height() / 2));
    return endRect;
}

void ImageView::nextImage() {
    ImgDesc newImage = d->grid->nextImage(d->image);
    if (newImage != nullptr) {
        loadImage(newImage);
    }
}

void ImageView::previousImage() {
    ImgDesc newImage = d->grid->prevImage(d->image);
    if (newImage != nullptr) {
        loadImage(newImage);
    }
}

void ImageView::loadImage(ImgDesc image) {
    d->image = image;

    if (image->isLoaded() == ImageDescriptor::NotLoaded) {
        //Load the full image
        image->load(false)->then([=] {
            d->locationAnimation->setEndValue(calculateEndRect());
            d->sourceRectAnimation->setEndValue(QRectF(0, 0, image->image().width(), image->image().height()));
            this->update();
        });
    }

    d->locationAnimation->setEndValue(calculateEndRect());
    d->sourceRectAnimation->setEndValue(QRectF(0, 0, image->image().width(), image->image().height()));
    this->update();

    if (d->grid != nullptr) {
        //Preload the next and previous image
        ImgDesc nextImage = d->grid->nextImage(image);
        if (!nextImage.isNull() && nextImage->isLoaded() == ImageDescriptor::NotLoaded) nextImage->load(false);
        ImgDesc prevImage = d->grid->prevImage(image);
        if (!nextImage.isNull() && prevImage->isLoaded() == ImageDescriptor::NotLoaded) prevImage->load(false);
    }

    //Update sidebar metadata
    QLocale locale;
    QList<ImageViewSidebarSection> sections;
    sections.append({tr("File"), {
                         {tr("Filename"), image->metadata().value(ImageDescriptor::FileName).toString()},
                         {tr("Dimensions"), ([=] {
                              QSize size = image->metadata().value(ImageDescriptor::Dimensions).toSize();
                              return QString("%1×%2").arg(size.width()).arg(size.height());
                          })()},
                     }});
    sections.append({tr("Image"), {
                         {tr("Flash"), image->metadata().value(ImageDescriptor::Flash).toBool() ? tr("Yes") : tr("No")},
                         {tr("ISO"), locale.toString(image->metadata().value(ImageDescriptor::ISO).toInt())}
                     }});
    sections.append({tr("Camera"), {
                         {tr("Camera Make"), image->metadata().value(ImageDescriptor::CameraMake).toString()},
                         {tr("Camera Model"), image->metadata().value(ImageDescriptor::CameraModel).toString()}
                     }});
    d->sidebar->setSections(sections);
}
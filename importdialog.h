#ifndef IMPORTDIALOG_H
#define IMPORTDIALOG_H

#include <QDialog>
#include <QFile>
#include <QDir>
#include <QProcess>
#include <QMessageBox>
#include <QListWidgetItem>
#include <QDebug>
#include <QProgressDialog>
#include <QInputDialog>
#include <QDirIterator>

namespace Ui {
class importDialog;
}

class importDialog : public QDialog
{
    Q_OBJECT

    enum stages {
        Device,
        Photo,
        Folder,
        Confirm,
        Import
    };

public:
    explicit importDialog(QWidget *parent = 0);
    ~importDialog();

private slots:
    void changeStage(stages stage);

    void on_forwardButton_clicked();

    void on_backButton_clicked();

    void on_quitButton_clicked();

    void setupStage(stages stage);

    void on_deviceList_currentItemChanged(QListWidgetItem *current, QListWidgetItem *previous);

    void on_pushButton_clicked();

    void photoError(QString message);

private:
    Ui::importDialog *ui;

    stages currentStage;
    QString workDir;
    QStringList foundImagePaths;

    void close();
};

#endif // IMPORTDIALOG_H

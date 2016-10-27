import { spawn } from "child_process"
import path from "path"
import os from "os"

import { app, autoUpdater, BrowserWindow, Menu, shell } from 'electron';

let menu;
let template;
let mainWindow = null;

const UPDATE_SERVER_HOST = "vr-store-nuts.herokuapp.com"

function run(args, cb) {
  const updateExe = path.resolve(path.dirname(process.execPath), "..", "Update.exe")

  spawn(updateExe, args, {
      detached: true
    })
  .on("close", cb)
}

function handleStartupEvent(){
  if (process.platform !== "win32") {
      return false
    }

  const cmd = process.argv[1]

  console.log("Processing squirrel command `%s`", cmd)

  const target = path.basename(process.execPath)
  if (cmd === "--squirrel-install" || cmd === "--squirrel-updated") {
    run(['--createShortcut=' + target + ''], app.quit)
      return true
    }
  else if (cmd === "--squirrel-uninstall") {
    run(['--removeShortcut=' + target + ''], app.quit)
      return true
    }
  else if (cmd === "--squirrel-obsolete") {
    app.quit()
      return true
    }
  else {
      return false
    }
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

if(!handleStartupEvent()){

  const version = app.getVersion()

  autoUpdater.addListener("update-available", (event) => {
    console.log("A new update is available")
      })
  autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    console.log("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
      })
  autoUpdater.addListener("error", (error) => {
    console.log(error)
      })
  autoUpdater.addListener("checking-for-update", (event) => {
    console.log("checking-for-update")
      })
  autoUpdater.addListener("update-not-available", () => {
    console.log("update-not-available")
      })

  autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/${version}`)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('ready', async () => {
    // await installExtensions();

    mainWindow = new BrowserWindow({
      // useContentSize:true,
      // show: false,
      width: 1024,
      height: 728
    });

    let appPath = process.env.NODE_ENV==='development' ?
      path.join( __dirname, 'app', 'app.html') : path.resolve(__dirname, '..', 'app.html') 

    mainWindow.loadURL(`file://${appPath}`);

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show();
      mainWindow.focus();
      if(!("--squirrel-firstrun" in process.argv)){
        autoUpdater.checkForUpdates()
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    if (process.env.NODE_ENV === 'development') {
      mainWindow.openDevTools();
      mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([{
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(x, y);
          }
        }]).popup(mainWindow);
      });
    }

    if (process.platform === 'darwin') {
      template = [{
        label: 'Electron',
        submenu: [{
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:'
        }, {
          type: 'separator'
        }, {
          label: 'Services',
          submenu: []
        }, {
          type: 'separator'
        }, {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:'
        }, {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        }, {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit();
          }
        }]
      }, {
        label: 'Edit',
        submenu: [{
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        }, {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        }, {
          type: 'separator'
        }, {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        }, {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        }, {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        }, {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }]
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: 'Reload',
          accelerator: 'Command+R',
          click() {
            mainWindow.webContents.reload();
          }
        }, {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }, {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click() {
            mainWindow.toggleDevTools();
          }
        }] : [{
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }]
      }, {
        label: 'Window',
        submenu: [{
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        }, {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        }, {
          type: 'separator'
        }, {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        }]
      // }, {
      //   label: 'Help',
      //   submenu: [{
      //     label: 'Learn More',
      //     click() {
      //       shell.openExternal('http://electron.atom.io');
      //     }
      //   }, {
      //     label: 'Documentation',
      //     click() {
      //       shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
      //     }
      //   }, {
      //     label: 'Community Discussions',
      //     click() {
      //       shell.openExternal('https://discuss.atom.io/c/electron');
      //     }
      //   }, {
      //     label: 'Search Issues',
      //     click() {
      //       shell.openExternal('https://github.com/atom/electron/issues');
      //     }
      //   }]
      }];

      menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    } else {
      template = [{
        label: '&File',
        submenu: [{
          label: '&Open',
          accelerator: 'Ctrl+O'
        }, {
          label: '&Close',
          accelerator: 'Ctrl+W',
          click() {
            mainWindow.close();
          }
        }]
      }, {
        label: '&View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click() {
            mainWindow.webContents.reload();
          }
        }, {
          label: 'Toggle &Full Screen',
          accelerator: 'F11',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }, {
          label: 'Toggle &Developer Tools',
          accelerator: 'Alt+Ctrl+I',
          click() {
            mainWindow.toggleDevTools();
          }
        }] : [{
          label: 'Toggle &Full Screen',
          accelerator: 'F11',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }]
      // }, {
      //   label: 'Help',
      //   submenu: [{
      //     label: 'Learn More',
      //     click() {
      //       shell.openExternal('http://electron.atom.io');
      //     }
      //   }, {
      //     label: 'Documentation',
      //     click() {
      //       shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
      //     }
      //   }, {
      //     label: 'Community Discussions',
      //     click() {
      //       shell.openExternal('https://discuss.atom.io/c/electron');
      //     }
      //   }, {
      //     label: 'Search Issues',
      //     click() {
      //       shell.openExternal('https://github.com/atom/electron/issues');
      //     }
      //   }]
      }];
      menu = Menu.buildFromTemplate(template);
      mainWindow.setMenu(menu);
    }
  });
}

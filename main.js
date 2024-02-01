const electron = require('electron');

const {app , BrowserWindow , Menu} = electron;
app.disableHardwareAcceleration();  

let win;


app.on('ready',()=>{

    win = new BrowserWindow({
        width:590,
        height:1000,

        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }

    })

    const menu = Menu.buildFromTemplate(Menutemplete);
    Menu.setApplicationMenu(menu);


    win.loadFile('index.html');

})


const Menutemplete = [
    {
     label:'Exit',
     submenu:[
        {role:'quit'},
     ]
    },
  
    
    {
      label: 'View',
      submenu: [
      
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
     
      ]
    },
  
 
  
  
    {
      label: 'About Developer',
      submenu: [
        {
          label: 'GitHub',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/rmnjaat')
          }
        },
        { type: 'separator' },
  
        {
          label: 'Linkdin',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://linkedin.com/in/raman-jangu')
          }
        }
      ]
    }
  ]
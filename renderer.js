window.addEventListener('DOMContentLoaded', () => {
  const apps = [
    { name: 'Notepad', icon: 'fa-regular fa-note-sticky' },
    { name: 'Viewer', icon: 'fa-regular fa-image' },
    { name: 'VideoPlayer', icon: 'fa-regular fa-video' },
    { name: 'FileManager', icon: 'fa-regular fa-folder-open' },
    { name: 'Terminal', icon: 'fa-solid fa-terminal' },
    { name: 'MiraBrowser', icon: 'fa-regular fa-globe' },
    { name: 'DevStudio', icon: 'fa-solid fa-code' },
    { name: 'Settings', icon: 'fa-solid fa-gear' }
  ];

  const directories = [
    { name: 'Desktop', icon: 'fa-regular fa-desktop' },
    { name: 'Documents', icon: 'fa-regular fa-file-lines' },
    { name: 'Apps', icon: 'fa-regular fa-th-large' },
    { name: 'System', icon: 'fa-solid fa-cogs' },
    { name: 'Recycle', icon: 'fa-regular fa-trash-can' }
  ];

  const desktop = document.getElementById('desktop');
  directories.forEach(item => {
    const iconEl = document.createElement('div');
    iconEl.className = 'desktop-icon';
    iconEl.innerHTML = `<i class=\"fa ${item.icon}\"></i><div class=\"label\">${item.name}</div>`;
    iconEl.addEventListener('dblclick', () => {
      openFileManager(item.name);
    });
    desktop.appendChild(iconEl);
  });

  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  startButton.addEventListener('click', () => {
    startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  apps.forEach(app => {
    const item = document.createElement('div');
    item.className = 'start-menu-item';
    item.innerHTML = `<i class=\"fa ${app.icon}\" style=\"margin-right:6px;\"></i>${app.name}`;
    item.addEventListener('click', () => {
      startMenu.style.display = 'none';
      openAppWindow(app.name);
    });
    startMenu.appendChild(item);
  });

  let zCounter = 1;
  function bringToFront(win) {
    zCounter++;
    win.style.zIndex = zCounter;
  }

  function openAppWindow(name) {
    let win = document.getElementById('window-' + name);
    if (win) {
      win.style.display = 'flex';
      bringToFront(win);
      return;
    }
    win = document.createElement('div');
    win.className = 'window';
    win.id = 'window-' + name;
    win.innerHTML = `
      <div class=\"window-header\">
        <span class=\"window-title\">${name}</span>
        <div class=\"window-controls\">
          <span class=\"minimize\">&#x2013;</span>
          <span class=\"maximize\">\u25A1</span>
          <span class=\"close\">&times;</span>
        </div>
      </div>
      <div class=\"window-content\"></div>
    `;
    document.body.appendChild(win);
    // random position
    win.style.left = (Math.random() * (window.innerWidth - 520)) + 'px';
    win.style.top = (Math.random() * (window.innerHeight - 340)) + 'px';
    // fill content
    const content = win.querySelector('.window-content');
    if (name === 'Notepad') {
      const textarea = document.createElement('textarea');
      textarea.style.width = '100%';
      textarea.style.height = '100%';
      content.appendChild(textarea);
    } else if (name === 'FileManager') {
      renderFileManager(content, '/');
    } else {
      content.innerHTML = `<p>${name} application is under construction.</p>`;
    }
    // buttons
    const controls = win.querySelector('.window-controls');
    controls.querySelector('.close').addEventListener('click', () => {
      win.remove();
    });
    controls.querySelector('.minimize').addEventListener('click', () => {
      win.style.display = 'none';
    });
    controls.querySelector('.maximize').addEventListener('click', () => {
      if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        win.style.top = win.dataset.top;
        win.style.left = win.dataset.left;
        win.style.width = win.dataset.width;
        win.style.height = win.dataset.height;
      } else {
        win.dataset.top = win.style.top;
        win.dataset.left = win.style.left;
        win.dataset.width = win.style.width;
        win.dataset.height = win.style.height;
        win.classList.add('maximized');
        win.style.top = '0px';
        win.style.left = '0px';
        win.style.width = window.innerWidth + 'px';
        win.style.height = (window.innerHeight - 40) + 'px';
      }
    });
    // dragging
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;
    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      bringToFront(win);
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
      }
    });
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    bringToFront(win);
    win.style.display = 'flex';
  }

  // simple VFS
  const vfs = {
    '/': ['Desktop', 'Documents', 'Apps', 'System', 'Recycle'],
    '/Desktop': [],
    '/Documents': [],
    '/Apps': ['SystemApps'],
    '/Apps/SystemApps': ['Notepad', 'Viewer', 'VideoPlayer', 'FileManager', 'Terminal', 'MiraBrowser', 'DevStudio', 'Settings'],
    '/System': ['config', 'icons', 'desktop', 'apps', 'themes'],
    '/Recycle': []
  };

  function openFileManager(dirName) {
    openAppWindow('FileManager');
    const win = document.getElementById('window-FileManager');
    const content = win.querySelector('.window-content');
    renderFileManager(content, '/' + dirName);
  }

  function renderFileManager(container, path) {
    container.innerHTML = '';
    const header = document.createElement('div');
    header.innerHTML = '<strong>Path:</strong> ' + path;
    header.style.marginBottom = '10px';
    container.appendChild(header);
    const list = document.createElement('div');
    const items = vfs[path] || [];
    if (items.length === 0) {
      list.innerHTML = '<em>Empty</em>';
    } else {
      items.forEach(item => {
        const el = document.createElement('div');
        el.style.margin = '4px 0';
        el.style.cursor = 'pointer';
        el.innerHTML = '<i class=\"fa fa-folder\" style=\"margin-right:5px;\"></i>' + item;
        el.addEventListener('dblclick', () => {
          const newPath = path === '/' ? '/' + item : path + '/' + item;
          renderFileManager(container, newPath);
        });
        list.appendChild(el);
      });
    }
    container.appendChild(list);
  }
});

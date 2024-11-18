/*
* Copyright(c) A.K.A wmcomlib.js Universal JavaScript Standard Function Library
* WMProject1217 Studios 2024
* FileName: wmshellui.js
* FileVersion: 0.1.3
* Author: WMProject1217
* LatestCommit: 2024-8-22
*/

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

window.WMShellUI = {
    version: "0.1.3",
    lock_messagebox: 0,
    lock_rightmenu: 0,
    showInputBox: async function(title, tip, defaulttext, callback = function() {}) {
        //void showInputBox(title: string, tip: string, defaulttext: string, callback: function(data: string) => void)
        //always return string
        if (this.lock_messagebox) {
            callback("");
            return;
        }
        this.lock_messagebox = 1;
        if (document.getElementById("WMShellUI_Container_MessageBox") == null) {
            this.temp_msgcont = document.createElement("div");
            this.temp_msgcont.classList.add("WMShellUI_Container_MessageBox");
            this.temp_msgcont.classList.add("status0");
            this.temp_msgcont.id = "WMShellUI_Container_MessageBox";
            document.body.appendChild(this.temp_msgcont);
        } else {
            document.getElementById("WMShellUI_Container_MessageBox").remove();
            this.temp_msgcont = document.createElement("div");
            this.temp_msgcont.classList.add("WMShellUI_Container_MessageBox");
            this.temp_msgcont.classList.add("status0");
            this.temp_msgcont.id = "WMShellUI_Container_MessageBox";
            document.body.appendChild(this.temp_msgcont);
        }
        this.temp_background = document.createElement("div");
        this.temp_background.classList.add("background");
        this.temp_divx = document.createElement("div");
        this.temp_divx.classList.add("box");
        this.temp_divy = document.createElement("div");
        this.temp_divy.classList.add("borderbox");
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("title");
        this.temp_newdiv.innerHTML = title;
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("splitline");
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("data");
        this.temp_newdiv_0 = document.createElement("div");
        this.temp_newdiv_0.innerHTML = tip;
        this.temp_newdiv_1 = document.createElement("input");
        this.temp_newdiv_1.type = "text"
        this.temp_newdiv_1.value = defaulttext;
        this.temp_newdiv.appendChild(this.temp_newdiv_0);
        this.temp_newdiv.appendChild(this.temp_newdiv_1);
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("splitline");
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("action");
        this.temp_btn0 = document.createElement("button");
        this.temp_btn0.innerHTML = "确认";
        this.temp_btn0.onclick = () => {
            this.removeMessageBox();
            callback(this.temp_newdiv_1.value);
        };
        this.temp_newdiv.appendChild(this.temp_btn0);
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_msgcont.appendChild(this.temp_background);
        this.temp_msgcont.appendChild(this.temp_divx);
        this.temp_divx.appendChild(this.temp_divy);
        setTimeout(() => {
            this.temp_msgcont.classList.remove("status0");
            this.temp_msgcont.classList.add("status1");
        }, 30);
    },
    showMessageBox: async function(title, data, mode, callback = function() {}) {
        //void showMessageBox(title: string, data: string, mode: int, callback: function(result: int) => void)
        //result -1 error, 0~2 for mode
        //mode *0 okonly, return 0
        //mode *1 yesno, 确认 return 0, 取消 return 1
        //mode *2 #18, 中断 return 0, 重试 return 1, 忽略 return 2
        if (this.lock_messagebox) {
            callback(-1);
            return;
        }
        this.lock_messagebox = 1;
        if (document.getElementById("WMShellUI_Container_MessageBox") == null) {
            this.temp_msgcont = document.createElement("div");
            this.temp_msgcont.classList.add("WMShellUI_Container_MessageBox");
            this.temp_msgcont.classList.add("status0");
            this.temp_msgcont.id = "WMShellUI_Container_MessageBox";
            document.body.appendChild(this.temp_msgcont);
        } else {
            document.getElementById("WMShellUI_Container_MessageBox").remove();
            this.temp_msgcont = document.createElement("div");
            this.temp_msgcont.classList.add("WMShellUI_Container_MessageBox");
            this.temp_msgcont.classList.add("status0");
            this.temp_msgcont.id = "WMShellUI_Container_MessageBox";
            document.body.appendChild(this.temp_msgcont);
        }
        this.temp_background = document.createElement("div");
        this.temp_background.classList.add("background");
        this.temp_divx = document.createElement("div");
        this.temp_divx.classList.add("box");
        this.temp_divy = document.createElement("div");
        this.temp_divy.classList.add("borderbox");
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("title");
        this.temp_newdiv.innerHTML = title;
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("splitline");
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("data");
        this.temp_newdiv.innerHTML = data;
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("splitline");
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("action");
        if (mode == 0) {
            this.temp_btn0 = document.createElement("button");
            this.temp_btn0.innerHTML = "确认";
            this.temp_btn0.onclick = () => {
                this.removeMessageBox();
                callback(0);
            };
            this.temp_newdiv.appendChild(this.temp_btn0);
        } else if (mode == 1) {
            this.temp_btn0 = document.createElement("button");
            this.temp_btn0.innerHTML = "确认";
            this.temp_btn0.onclick = () => {
                this.removeMessageBox();
                callback(0);
            };
            this.temp_newdiv.appendChild(this.temp_btn0);
            this.temp_btn1 = document.createElement("button");
            this.temp_btn1.innerHTML = "取消";
            this.temp_btn1.onclick = () => {
                this.removeMessageBox();
                callback(1);
            };
            this.temp_newdiv.appendChild(this.temp_btn1);
        } else if (mode == 2) {
            this.temp_btn0 = document.createElement("button");
            this.temp_btn0.innerHTML = "中断";
            this.temp_btn0.onclick = () => {
                this.removeMessageBox();
                callback(0);
            };
            this.temp_newdiv.appendChild(this.temp_btn0);
            this.temp_btn1 = document.createElement("button");
            this.temp_btn1.innerHTML = "重试";
            this.temp_btn1.onclick = () => {
                this.removeMessageBox();
                callback(1);
            };
            this.temp_newdiv.appendChild(this.temp_btn1);
            this.temp_btn2 = document.createElement("button");
            this.temp_btn2.innerHTML = "忽略";
            this.temp_btn2.onclick = () => {
                this.removeMessageBox();
                callback(2);
            };
            this.temp_newdiv.appendChild(this.temp_btn2);
        } else {
            this.temp_btn0 = document.createElement("button");
            this.temp_btn0.innerHTML = "确认";
            this.temp_btn0.onclick = () => {
                this.removeMessageBox();
                callback(0);
            };
            this.temp_newdiv.appendChild(this.temp_btn0);
        }
        this.temp_divy.appendChild(this.temp_newdiv);
        this.temp_msgcont.appendChild(this.temp_background);
        this.temp_msgcont.appendChild(this.temp_divx);
        this.temp_divx.appendChild(this.temp_divy);
        setTimeout(() => {
            this.temp_msgcont.classList.remove("status0");
            this.temp_msgcont.classList.add("status1");
        }, 30);
    },
    removeMessageBox: async function() {
        //void removeMessageBox()
        this.temp_newdiv = document.createElement("div");
        this.temp_newdiv.classList.add("workshield");
        this.temp_msgcont.appendChild(this.temp_newdiv);
        setTimeout(() => {
            this.temp_msgcont.classList.remove("status1");
            this.temp_msgcont.classList.add("status2");
        }, 30);
        setTimeout(() => {
            this.temp_newdiv.remove();
            this.temp_msgcont.remove();
            this.lock_messagebox = 0;
        }, 330);
    },
    showRightMenu: async function(items, position, callback = function() {}) {
        //void showRightMenu(items: [], position: [x: int, y: int], callback: function(result: int) => void)
        if (this.lock_rightmenu) {
            this.removeRightMenu();
        }
        if ((typeof process != "undefined") && (typeof process.__nwjs != "undefined")) {
            //For NWjs only
            if (typeof items != "object") {
                return;
            }
            this.temp_menu = new nw.Menu();
            for (var i = 0; i < items.length; i++) {
                const temp_i = i;
                this.temp_menu.append(new nw.MenuItem({ label: items[temp_i], click: () => { callback(temp_i); } }));
            }
            this.temp_menu.popup(position[0], position[1]);
            return;
        }
    },
    removeRightMenu: function() {
        //int removeRightMenu()
        //return -1 error, return 0 ok, return 1 not found
        try {
            if (document.getElementById("") == undefined) {
                return 1;
            }
        } catch(error) {
            console.error(error);
            return -1;
        }
        this.lock_rightmenu = 0;
        return 0;
    }
}
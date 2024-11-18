/*
* Copyright(c) A.K.A wmcomlib.js Universal JavaScript Standard Function Library
* WMProject1217 Studios 2024
* FileName: wmmsgsys.js
* FileVersion: 0.1.2
* Author: WMProject1217
* LatestCommit: 2024-7-20
*/

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

window.WMMessageSystem = {
    version: "0.1.2",
    EventMessage: {
        send: function(content, title = "Message", icon = "null", timeout = 8000) {
            if (document.getElementById("WMMessageSystem_Container") == null) {
                var div = document.createElement('div');
                div.id = "WMMessageSystem_Container";
                div.className = "WMMessageSystem_Container";
                document.body.appendChild(div);
            }
            if (document.getElementById("WMMessageSystem_Container").getElementsByClassName("EventMessage_Container")[0] == null) {
                var div = document.createElement('div');
                div.className = "EventMessage_Container";
                document.getElementById("WMMessageSystem_Container").appendChild(div);
            }
            var div = document.createElement('div');
            div.classList.add("message");
            div.classList.add("status0");
            if (icon == "null") {
                var titlediv = document.createElement('div');
                titlediv.className = "title";
                titlediv.innerHTML = title;
                var contentdiv = document.createElement('div');
                contentdiv.className = "content";
                contentdiv.innerHTML = content;
            } else {
                var imagexx = document.createElement('img');
                imagexx.className = "rhimage";
                imagexx.src = icon;
                var titlediv = document.createElement('div');
                titlediv.className = "rhtitle";
                titlediv.innerHTML = title;
                var contentdiv = document.createElement('div');
                contentdiv.className = "rhcontent";
                contentdiv.innerHTML = content;
                div.appendChild(imagexx);
            }
            div.appendChild(titlediv);
            div.appendChild(contentdiv);
            document.getElementById("WMMessageSystem_Container").getElementsByClassName("EventMessage_Container")[0].appendChild(div);
            setTimeout(() => {
                div.classList.remove("status0");
                div.classList.add("status1");
            }, 2);
            setTimeout(() => {
                div.classList.remove("status1");
                div.classList.add("status0");
                setTimeout(() => {
                    div.remove();
                }, 500);
            }, timeout + 502);
        }
    },
    ActiveBarMessage: {
        timer: null,
        timer_countdown: 0,
        send: function(content) {
            this.timer_countdown = 80;
            if (document.getElementById("WMMessageSystem_Container") == null) {
                var div = document.createElement('div');
                div.id = "WMMessageSystem_Container";
                div.className = "WMMessageSystem_Container";
                document.body.appendChild(div);
            }
            if (document.getElementById("WMMessageSystem_Container").getElementsByClassName("ActiveBarMessage_Container")[0] == null) {
                var div = document.createElement('div');
                div.className = "ActiveBarMessage_Container";
                document.getElementById("WMMessageSystem_Container").appendChild(div);
            }
            if (document.getElementById("WMMessageSystem_Container").getElementsByClassName("ActiveBarMessage_Container")[0].getElementsByClassName("content")[0] == null) {
                var contentdiv = document.createElement('div');
                contentdiv.classList.add("content");
                contentdiv.classList.add("status0");
                document.getElementById("WMMessageSystem_Container").getElementsByClassName("ActiveBarMessage_Container")[0].appendChild(contentdiv);
                timext = 0;
            } else {
                var contentdiv = document.getElementById("WMMessageSystem_Container").getElementsByClassName("ActiveBarMessage_Container")[0].getElementsByClassName("content")[0];
                if (contentdiv.classList.contains("status0")) {
                    timext = 0;
                }
                if (contentdiv.classList.contains("status1")) {
                    contentdiv.classList.remove("status1");
                    contentdiv.classList.add("status0");
                    timext = 300;
                    this.timer_countdown = this.timer_countdown + 3;
                }
            }
            setTimeout(() => {
                contentdiv.innerHTML = content;
                contentdiv.classList.remove("status0");
                contentdiv.classList.add("status1");
            }, timext + 2);
            if (this.timer == null) {
                this.timer = setInterval(() => {
                    this.timer_countdown = this.timer_countdown - 1;
                    if (this.timer_countdown <= 0) {
                        clearInterval(this.timer);
                        this.timer = null;
                        contentdiv.classList.remove("status1");
                        contentdiv.classList.add("status0");
                    }
                }, 100);
            }
        }
    },
    LogMessage: {
        _debug_auto2console: 1,
        timestr_type: 3, //0 for S.C., 1 for A.C., 2 for Short S.C., 3 for Short A.C., S.C. function request wmtime.js
        send: function(str, type = 0) { //type 0 for raw, other values for other functions
            if (this._debug_auto2console == 1 && type == 0) {
                console.log(str);
            }
            if (document.getElementById("WMMessageSystem_Container") == null) {
                var div = document.createElement('div');
                div.id = "WMMessageSystem_Container";
                div.className = "WMMessageSystem_Container";
                document.body.appendChild(div);
            }
            if (document.getElementById("WMMessageSystem_Container").getElementsByClassName("LogMessage_Container")[0] == null) {
                var div = document.createElement('div');
                div.className = "LogMessage_Container";
                document.getElementById("WMMessageSystem_Container").appendChild(div);
            }
            var div = document.createElement('div');
            div.classList.add("message");
            div.classList.add("status0");
            div.innerHTML = str;
            document.getElementById("WMMessageSystem_Container").getElementsByClassName("LogMessage_Container")[0].appendChild(div);
            setTimeout(() => {
                div.classList.remove("status0");
                div.classList.add("status1");
                document.getElementById("WMMessageSystem_Container").getElementsByClassName("LogMessage_Container")[0].scrollTop = document.getElementById("WMMessageSystem_Container").getElementsByClassName("LogMessage_Container")[0].scrollHeight;
            }, 2);
            setTimeout(() => {
                div.classList.remove("status1");
                div.classList.add("status0");
                setTimeout(() => {
                    div.remove();
                }, 300);
            }, 8302);
        },
        getnowtimestr: function() {
            if (this.timestr_type == 0) {
                return WMTime.GetNowTimeSCStr();
            } else if (this.timestr_type == 1) {
                var offsetGMT = new Date().getTimezoneOffset();
                var localDate = new Date().getTime();
                var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
                return time.getFullYear() + "/" + time.getMonth() + "/" + (time.getDate() - 1) + "-" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
            } else if (this.timestr_type == 2) {
                var sctimeint = WMTime.GetNowTimeSCInt();
                var ssc = parseInt(sctimeint / 1024) - parseInt(parseInt(sctimeint / 32768) * 32);
                var msc = parseInt(sctimeint / 32768) - parseInt(parseInt(sctimeint / 8388608) * 256);
                var hsc = parseInt(sctimeint / 8388608) - parseInt(parseInt(sctimeint / 536870912) * 64);
                return hsc + ":" + msc + ":" + ssc;
            } else if (this.timestr_type == 3) {
                var offsetGMT = new Date().getTimezoneOffset();
                var localDate = new Date().getTime();
                var time = new Date(localDate + offsetGMT * 60 * 1000 + 8 * 60 * 60 * 1000);
                return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            } else {
                return "";
            }
        },
        log: function(x) {
            if (this._debug_auto2console == 1) {
                console.log(x);
            }
            this.send("[" + this.getnowtimestr() + "]" + x.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>"), 1);
        },
        info: function(x, objinfo = "") {
            if (this._debug_auto2console == 1) {
                console.log(x, objinfo);
            }
            this.send("<div style=\"color: #FFFFFF;\">[" + this.getnowtimestr() + "][INFO]" + x.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>") + "</div>", 1);
        },
        warn: function(x, objwarn = "") {
            if (this._debug_auto2console == 1) {
                console.warn(x, objwarn);
            }
            this.send("<div style=\"color: #EEEE22; font-weight: bold;\">[" + this.getnowtimestr() + "][WARN]" + x.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>") + "</div>", 1);
        },
        fail: function(x, objerror = "") {
            if (this._debug_auto2console == 1) {
                console.error(x, objerror);
            }
            this.send("<div style=\"color: #EE4444; font-weight: bold;\">[" + this.getnowtimestr() + "][FAIL]" + x.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>") + "</div>", 1);
        }
    }
}
let mixin = {
    data() {
        return {
            oem: {},
            uid: "",
            passwd: "",
            staticToken: "",
            hostname: location.hostname,
            parentToken: "",
        }
    },
    mounted() {
        this.getOem();

        // 根据url参数登录
        // var uid = getQueryString("uid");
        // var password = getQueryString("password");
        // var parentToken = getQueryString("parentToken");
        // var staticToken = getQueryString("staticToken");
        // if (uid && password && parentToken) {
        //     uid = Base64.decode(uid)
        //     password = Base64.decode(password)
        //     parentToken = Base64.decode(parentToken)
        //     this.uid = uid;
        //     this.passwd = password;
        //     this.parentToken = parentToken
        //     this.login();
        // }
        // if (staticToken) {
        //     this.staticToken = staticToken;
        //     this.login(true);
        // }
    },
    methods: {
        login(isEx) {
            var data;
            if (!isEx) {
                data = {
                    uid: this.uid,
                    passwd: this.passwd,
                    hostname: this.hostname == 'localhost'?'127.0.0.1':this.hostname,
                    codeKey: "12313",
                    code: "1234567890",
                    parentToken: this.parentToken
                };
                if (!data.uid) return alert("请输入账户名!");
                if (!data.passwd) return alert("请输入密码!");
            } else {
                data = {
                    uid: "", //登录名
                    passwd: "", //密码
                    hostname: "127.0.0.1", //固定值，写127.0.0.1
                    staticToken: this.staticToken //与登录名绑定的静态token
                };
            }
            this.$ajax({
                url: isEx ? "/dsp/user/loginEx" : "/dsp/user/login",
                load: true,
                data: data
            }).then(function(data) {
                var token = data.token;
                localStorage.accountType = token.accountType;
                switch (token.accountType) {
                    case "0":
                        localStorage.adminToken = token.token;
                        location.href = "./admin.html#/index";
                        break;
                    case "1":
                        localStorage.dspToken = token.token;
                        location.href = "./saas.html";
                        break;
                    case "2":
                        localStorage["agentToken" + token.agencyID] = token.token;
                        localStorage["agentIsDirect" + token.agencyID] =
                            token.isDirect;
                        location.href =
                            "./agent.html#/" +
                            token.agencyID +
                            "/";
                        break;
                    case "3":
                        localStorage["advToken" + token.advertiserID] =
                            token.token;
                        location.href =
                            "./adv.html#/0/" +
                            token.advertiserID +
                            "/";
                        break;
                }
            });
        },
        getOem() {
            // OEM信息
            this.$ajax({
                url: "/dsp/user/oem/query",
                load: true,
                data: {
                    hostname: this.hostname
                }
            }).then(data => {
                let defaultOEM = {};
                switch (this.SKIN) {
                    case 1:
                        defaultOEM.background = "http://res1.hubcloud.com.cn/dsp/clientInfo/2018/4/10/1523329438394.png";
                        defaultOEM.loginLogo = require("../../common/img/sk1-images/login_logo.png");
                        defaultOEM.staticLogo = require("../../common/img/sk1-images/login_bg.png");
                        // 皮肤1 背景图在body上
                        document.body.style.backgroundImage = "url(http://res1.hubcloud.com.cn/dsp/clientInfo/2018/4/10/1523329438394.png)";
                        break;
                    case 2:
                        defaultOEM.background = require("../../common/img/sk2-images/login-bg.jpg");
                        defaultOEM.loginLogo = require("../../common/img/sk2-images/login-logo-right.png");
                        defaultOEM.staticLogo = require("../../common/img/sk2-images/logo.png");
                        break;
                    case 3:
                        defaultOEM.background = require("../../common/img/sk3-images/login-bg.jpg");
                        defaultOEM.loginLogo = require("../../common/img/sk3-images/login-logo-right.png");
                        defaultOEM.staticLogo = require("../../common/img/sk3-images/logo.png");
                        // 皮肤3 背景图在body上
                        document.body.style.backgroundImage = 'url('+defaultOEM.background+')';
                        break;
                
                    default:
                        break;
                }
                this.oem = {
                    url: data.url || "", //自有域名
                    background:
                        data.background ||
                        defaultOEM.background,
                        // "http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/58c0b912a185289740281d0ce02c210b.jpg", // 登陆页面背景图片
                    loginLogo:
                        data.loginLogo ||
                        defaultOEM.loginLogo, //登陆页面Logo地址
                    staticLogo:
                        data.staticLogo || 
                        defaultOEM.staticLogo, //导航栏Logo地址
                    sdkLogo: data.sdkLogo || "", //SDK Logo地址
                    iconUrl: data.iconUrl || "", //角标图片地址
                    title: data.title || "投放端", //所有oem文字信息
                    icp: data.icp || "",
                    copyright: data.copyright || "", //版权信息
                    // dspTitle: data.title || "Adhub运营后台", //dsp端title

                    adLogo: data.adLogo || "",
                    adLogoExt: data.adLogoExt || "",
                    adLogoUrl: data.adLogoUrl || "",
                    adLabel: data.adLabel || ""
                };

                this.$store.commit("setOem",this.oem)
            });
        },
    }
}

export {mixin}
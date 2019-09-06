## 漫谈 PWA 的过去、现在与未来

听说 PWA 的概念已经很久了，直到前几个月有个内部项目需要做离线消息推送功能，才开始真正地实践 PWA，做了 Service Worker 、Web Push 还有保存到桌面几个功能。尽管已经可以熟练地实现 PWA 的主要功能，我还是没法准确地描述和定义 PWA。网上有很多介绍 PWA 的文章，但是自己一直很难对这些知识融会贯通。为了更深入地了解 PWA，我花了几个星期的时间，查阅了 PWA 从提出到现在，相关的视频和文章，最后写出了这篇 PWA 科普文。（这里不会详细介绍每种技术的具体实现，因为相关的内容网上已经足够多了）

### PWA 的历史

早在 2014 年，谷歌的工程师 Alex Russell 在 Chrome Dev Summit 上做了一次演讲，主题是 *Making Web Apps Appy*。主要讲的是使用 Service Worker 实现离线缓存和消息推送、以及通过 manifest.json 配置文件生成桌面应用等功能，使得 Web 应用的体验更像 App。而当时，这些技术还只能在开发版本的 Chrome 上使用。

到了 2015 年 6 月，Alex Russell 在博客上发表了一篇文章 *Progressive Web Apps: Escaping Tabs Without Losing Our Soul*，第一次提出了 PWA 这个名字。文章谈论了当时一些使用 Web 技术开发客户端应用的框架和平台，开发者为了获得离线工作、添加到主屏幕、访问系统 API 等功能，不得不接受打包、分发到应用商店，同时放弃 Web 的开放性。是否存在一种应用形式，既具备 Web 的开放性，又可以实现离线工作、添加到主屏幕等功能呢？Alex 和他的同事 Frances 总结出了这类应用应具有的特性：

- Responsive
- Connectivity independent
- App-like-interactions
- Fresh
- Safe
- Discoverable
- Re-engageable
- Installable
- Linkable

能达到上面这些条件的应用，可视为 “Progressive Web Apps”，即 PWA。

随着 2017 年 Apple 在 safari 中支持 Service Worker，PWA 现在可以运行在 Android 和 iOS 两大操作系统上了。

### PWA 使用到的主要技术

#### 使用 Service Worker 进行离线缓存

Service Worker 脱胎于 Web Worker。Web Worker 的目的是解放主线程，将一些复杂、耗时的工作交给 Web Worker 处理，处理完后通过 postMessage 告诉主线程。但当页面关闭时，Web Worker 也无法继续工作，而 Service Worker 一旦注册会一直存在，除非手动卸载。借助此特性，Service Worker 可以实现后台接收消息推送、后台同步等功能。

同时 Service Worker 可以拦截并修改访问和资源请求，细粒度地缓存资源和实现离线缓存。相比于 HTTP 协议缓存、App Cache 和浏览器本地存储等缓存方式来说，Service  Worker 提供了可编程的方式进行缓存处理，操作更加灵活。

Service Worker 非常强大，因此只能在安全的上下文中执行（即 HTTPS ）。 

#### 使用 Web App Manifest 将站点添加至首屏

在项目 html 文件中引入 manifest.json 文件，在 manifest.json 文件中进行相应配置，可以实现以下功能：

基本功能: 自定义名称、自定义图标、自定义启动网址、设置作用域  
改善应用体验：添加启动画面、设置显示类型、指定显示方向、设置主题色  
应用安装横幅：引导用户添加应用、引导用户安装原生应用

#### 消息推送
Notifications API 允许网页控制显示系统通知，而 Push API 可以实现从服务端直接推送消息到客户端，配合 Service Worker 使用，可以做到应用被隐藏到后台或者被关闭时，仍然能够接收推送。

![消息推送流程图](https://upload-images.jianshu.io/upload_images/2135310-20b048e887e42b8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

推送流程如上，其中，推送服务由浏览器提供，Chrome 是 Firebase Cloud Messaging、Firefox 是 Mozilla Cloud Services、Edge 是 Windows Push Notification Service。

### PWA 目前现状

1. 到了 2019 年，PWA 在各大浏览器上已经得到了较好的支持，也有很多大的互联网公司采用了 PWA，例如 [twitter]([https://twitter.com/home](https://twitter.com/home)
)、[flipkart]([https://www.flipkart.com](https://www.flipkart.com/)
)、[bilibi]([https://m.bilibili.com/index.html](https://m.bilibili.com/index.html)
) 等等（可以通过 [pwaappstore.cn](https://www.pwaappstore.cn/#/pwashop-home)、[outweb.io]([https://outweb.io](https://outweb.io/)
) 等站点查找更多 PWA 应用）。

2. 在 Android 上，手动添加到主屏幕和自动弹出添加到主屏幕提示，都得到较好的支持，但在 iOS 上，只有 safari 可以添加到主屏幕，且只能手动添加，同时 safari 添加主屏幕也存在一些问题，比如你需要通过在 html 中声明 apple-touch-icon 属性来定义桌面图标，而不是在 manifest.json 中声明；另外 safari 里进行应用切换，返回到原来的 PWA 应用会导致重新加载等问题。  
桌面端浏览器目前只有 Chrome 支持添加到桌面，其它浏览器不支持。旧版本 Chrome 添加按钮被放在菜单里面，而最新版本的 Chrome 添加按钮放到了搜索框右侧。

![Chrome 中安装 PWA](https://upload-images.jianshu.io/upload_images/2135310-2b2d60d02ed5e893.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 消息推送使用到的推送服务是由浏览器提供的，Chrome 使用 Firebase Cloud Messaging（FCM），和 firefox 使用 Mozilla Cloud Services，Edge 使用 Windows Push Notification Service，桌面端 safari 使用 Apple Push Notification Service（APNS）。其中 FCM 由于墙的问题，在国内没法使用，而 APNS 并不符合标准 W3C Web Push 协议，需要申请苹果开发者账号等操作，且移动端不支持。目前国内只有 UC 浏览器支持。

### PWA 的未来

1. PWA 会取代移动原生应用吗？
和移动原生应用比起来，PWA 具有无需安装、发布无需审核、跨平台、开发效率高、 SEO、及时更新等诸多优点，但其也面临着一个很大的缺点，即浏览器兼容性问题。移动原生应用开发，只需要考虑 Android 和 iOS 两大平台，而 PWA 开发不仅需要考虑 Android 和 iOS，同时还要考虑各种主流浏览器对不同特性的支持情况。另外，PWA 在功能、性能和用户体验上和移动原生应用也还存在一定距离。  
如果后续浏览器产商在 PWA 支持上能够更加积极的话，未来 PWA 取代原生移动应用还是很有可能的，毕竟移动原生应用开发那么多缺点摆在那，但进度可能不会很快。个人认为以跨平台和使用类 Web 技术开发的框架或平台，如 Flutter 等会更快取代移动原生应用开发。

2. PWA 会取代小程序吗？
无论从功能上还是从商业上，PWA 都无法取代小程序。对于平台来说，小程序存在的意义是加强自身平台垄断地位，因此平台不愿意，PWA 再好也无法取代。另一方面，对于开发者来说，开发小程序，主要是为了获取平台的红利，像微信、支付宝、百度和今日头条，都拥有大量的用户，不可能因为 PWA 更开放而放弃小程序这么大的市场。  
功能上，尽管 PWA 更加开放，但不可否认，PWA 提供的能力太少，而且发布流程冗长还存在兼容性问题，完全没法和小程序竞争。因此，仅做国内市场，小程序应该优先被考虑。

3. PWA 会取代 Electron 吗？
Electron 和 PWA 最大的区别是，Electron 应用是真正的桌面应用，他可以直接使用最新的操作系统提供的 API，而 PWA 的能力受限于不同的浏览器。但 PWA 相对于 Electron 的好处在于，它无需安装、安全性以及甚至能在手机上使用。PWA 和 Electron 并不是你死我活的关系，当你使用 web 技术开发 app 时，最好先考虑使用 PWA，当你觉得 PWA 提供的功能不够用了，你可以使用 Electron 将你的 PWA 应用进行打包，变成桌面应用，从而使用更多的操作系统 API。

综上，可以看出，PWA 其实不能完全替代目前现有的客户端开发技术。其实我们可以把 PWA 看做是一门优化 Web 体验的技术，就像 AJAX 一样，并不是想取代谁，而是想让用户拥有更好的 Web 体验。未来，PWA 仍然会与小程序、Electron 和原生移动应用共生，要说 PWA 会取代谁，那应该是目前体验不好的 Web App 吧。

**引用资料**：

[Making Web Apps Appy - Chrome Dev Summit 2014 (Alex Russell)](https://www.youtube.com/watch?v=QbuLq4f6DGQ)   
[Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)  
[Progressive Web Apps (Chrome Dev Summit 2015)](https://www.youtube.com/watch?v=MyQ8mtR9WxI)  
[WikiPedia: Progressive web applications](https://en.wikipedia.org/wiki/Progressive_web_applications#cite_note-Medium_Nov_2018-9)  
[MDN Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)  
[百度 lavas PWA 文档](https://lavas.baidu.com/pwa)  
[Web Push Notifications](https://developers.google.com/web/fundamentals/push-notifications/)  
[Why Build Progressive Web Apps: PWAs for iOS](https://www.youtube.com/watch?v=s5ASNwnBttQ)  
[PWA vs Native App: Benefits for Users and Developers](https://jelvix.com/blog/pwa-vs-native-app-benefits-for-users-and-developers)  
[Progressive Web Apps & Electron](https://felixrieseberg.com/progressive-web-apps-electron/)  

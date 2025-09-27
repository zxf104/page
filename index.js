// index.js

// --- 1. 存储您的完整 HTML 内容（包括 CSS 和 JavaScript） ---
// Cloudflare Worker 的核心思想是将内容作为字符串返回。
const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>静态导航页面</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
        
        body {
            display: flex;
            min-height: 100vh;
            background-color: #f5f7fa;
            color: #333;
        }
        
        /* 左侧导航样式 */
        .sidebar {
            width: 250px;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 20px 0;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            z-index: 100;
        }
        
        .logo {
            text-align: center;
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo h1 {
            font-size: 1.8rem;
            font-weight: 300;
            letter-spacing: 1px;
        }
        
        .nav-category {
            margin-bottom: 30px;
        }
        
        .nav-category h2 {
            font-size: 1.1rem;
            padding: 10px 20px;
            color: #ecf0f1;
            font-weight: 500;
            border-left: 4px solid transparent;
            transition: all 0.3s;
        }
        
        .nav-items {
            list-style: none;
        }
        
        .nav-items li {
            padding: 12px 20px 12px 40px;
            cursor: pointer;
            transition: all 0.3s;
            border-left: 4px solid transparent;
        }
        
        .nav-items li:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-left: 4px solid #3498db;
        }
        
        .nav-items li.active {
            background-color: rgba(52, 152, 219, 0.2);
            border-left: 4px solid #3498db;
            color: #3498db;
        }
        
        /* 右侧内容区样式 */
        .content {
            flex: 1;
            margin-left: 250px;
            padding: 30px;
        }
        
        .content-section {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            display: none;
            animation: fadeIn 0.5s ease;
        }
        
        .content-section.active {
            display: block;
        }
        
        .content-section h2 {
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .content-section p {
            line-height: 1.6;
            margin-bottom: 15px;
            color: #555;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .sidebar {
                width: 100%;
                height: auto;
                position: relative;
            }
            
            .content {
                margin-left: 0;
            }
            
            body {
                flex-direction: column;
            }
        }
        
        /* 动画效果 */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo">
            <h1>导航中心</h1>
        </div>
        
        <div class="nav-category">
            <h2>主要分类</h2>
            <ul class="nav-items">
                <li class="active" data-target="home">首页</li>
                <li data-target="products">产品介绍</li>
                <li data-target="services">服务项目</li>
                <li data-target="about">关于我们</li>
            </ul>
        </div>
        
        <div class="nav-category">
            <h2>其他分类</h2>
            <ul class="nav-items">
                <li data-target="news">最新动态</li>
                <li data-target="contact">联系我们</li>
                <li data-target="faq">常见问题</li>
            </ul>
        </div>
    </div>
    
    <div class="content">
        <div id="home" class="content-section active">
            <h2>欢迎来到我们的网站</h2>
            <p>这是一个静态导航页面的示例，展示了如何创建左侧分类导航和右侧内容区域。</p>
            <p>点击左侧不同的分类，右侧将显示相应的内容。这个设计采用了响应式布局，可以在各种设备上良好显示。</p>
            <p>您可以根据需要修改内容和样式，以适应您的具体需求。</p>
        </div>
        
        <div id="products" class="content-section">
            <h2>产品介绍</h2>
            <p>我们提供多种高质量的产品，满足您的不同需求。</p>
            <p>我们的产品经过严格的质量控制，确保每一件产品都符合最高标准。</p>
            <p>从基础款到专业版，我们都有适合您的选择。</p>
        </div>
        
        <div id="services" class="content-section">
            <h2>服务项目</h2>
            <p>我们提供全方位的服务，包括咨询、实施和维护。</p>
            <p>我们的专业团队将为您提供最优质的服务体验。</p>
            <p>无论您遇到什么问题，我们都会尽力帮助您解决。</p>
        </div>
        
        <div id="about" class="content-section">
            <h2>关于我们</h2>
            <p>我们是一家专注于提供优质产品和服务的公司。</p>
            <p>成立于2010年，我们已经服务了上千家客户，获得了广泛的好评。</p>
            <p>我们的使命是通过创新和技术，为客户创造更大的价值。</p>
        </div>
        
        <div id="news" class="content-section">
            <h2>最新动态</h2>
            <p>我们刚刚发布了新版本的产品，增加了多项实用功能。</p>
            <p>下个月我们将举办线上研讨会，欢迎报名参加。</p>
            <p>关注我们的社交媒体，获取最新资讯和优惠信息。</p>
        </div>
        
        <div id="contact" class="content-section">
            <h2>联系我们</h2>
            <p>如果您有任何问题或建议，欢迎通过以下方式联系我们：</p>
            <p>电话：123-456-7890</p>
            <p>邮箱：info@example.com</p>
            <p>地址：某市某区某街道123号</p>
        </div>
        
        <div id="faq" class="content-section">
            <h2>常见问题</h2>
            <p><strong>问题1：如何购买产品？</strong></p>
            <p>答：您可以通过我们的官方网站或授权经销商购买。</p>
            <p><strong>问题2：产品有保修吗？</strong></p>
            <p>答：是的，我们提供一年的产品保修服务。</p>
            <p><strong>问题3：支持定制服务吗？</strong></p>
            <p>答：是的，我们提供个性化的定制服务，请联系我们的客服。</p>
        </div>
    </div>

    <script>
        // 导航交互功能
        document.addEventListener('DOMContentLoaded', function() {
            const navItems = document.querySelectorAll('.nav-items li');
            const contentSections = document.querySelectorAll('.content-section');
            const contentArea = document.querySelector('.content');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    // 移除所有active类
                    navItems.forEach(nav => nav.classList.remove('active'));
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    // 添加active类到当前项
                    this.classList.add('active');
                    const targetId = this.getAttribute('data-target');
                    document.getElementById(targetId).classList.add('active');
                    
                    // 切换内容后将内容区域滚动到顶部
                    if (contentArea) {
                        contentArea.scrollTo({
                            top: 0,
                            behavior: 'smooth' 
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>
`;

// --- 2. Worker 脚本入口 ---

// 监听所有的 fetch 请求
addEventListener('fetch', event => {
  // 阻止 Worker 脚本处理非根路径的请求（可选，但通常 Worker 只需要处理主页）
  const url = new URL(event.request.url);
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    // 对于非主页请求，返回 404 响应
    return event.respondWith(new Response('404 Not Found', { status: 404 }));
  }
  
  // 处理请求，返回 HTML 内容
  event.respondWith(handleRequest(event.request));
});

/**
 * 处理传入的 HTTP 请求。
 * @param {Request} request 
 */
async function handleRequest(request) {
  // 返回一个新的 Response 对象，其中包含 HTML 内容
  return new Response(HTML_CONTENT, {
    headers: {
      // 必须指定内容类型为 text/html，浏览器才能正确解析
      'Content-Type': 'text/html;charset=UTF-8',
      
      // 可选：设置缓存策略，让 Cloudflare 缓存 Worker 响应
      'Cache-Control': 'public, max-age=3600' // 缓存 1 小时
    },
    status: 200 // HTTP 状态码
  });
}
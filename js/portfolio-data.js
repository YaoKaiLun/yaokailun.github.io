window.portfolioProfile = {
  name: '姚凯伦',
  title: 'Agent 应用工程师',
  intro:
    '专注 macOS 原生工具、浏览器扩展与 AI 协作开发，用产品化方式解决日常开发中的重复劳动与审查痛点。'
}

window.portfolioWorks = [
  {
    title: 'OpenSwitch',
    description:
      'macOS 文件默认打开方式管理工具：将多个扩展名打包成预设，一键切换到 Cursor、VSCode 等目标应用，替代在系统设置里逐个修改。',
    tags: ['macOS', 'SwiftUI', 'Swift', 'LaunchServices'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/YaoKaiLun/OpenSwitch',
        icon: 'fab fa-github'
      }
    ]
  },
  {
    title: 'Sift',
    description:
      'macOS 开源 Git diff 阅读器：在同一窗口管理多仓库与 worktree，集中审查文件改动、hunk 暂存/放弃，并支持 AI 解释选区（兼容 OpenAI Chat Completions）。',
    tags: ['macOS', 'Swift', 'Git', 'Diff'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/YaoKaiLun/Sift',
        icon: 'fab fa-github'
      }
    ]
  },
  {
    title: 'JSONL Viewer',
    description:
      'Chrome Manifest V3 扩展：本地打开 JSONL / NDJSON / zstd 压缩 JSONL，逐行预览、搜索与 JSON 树查看，文件不离开浏览器。',
    tags: ['Chrome 扩展', 'Manifest V3', 'JavaScript', 'Web Worker'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/YaoKaiLun/jsonl-preview',
        icon: 'fab fa-github'
      }
    ]
  },
  {
    title: '影响世界的十大算法',
    description:
      'B 站系列视频：手绘风格讲解影响世界的十大算法，用可视化叙事降低算法概念的入门门槛。',
    tags: ['Bilibili', '算法', '手绘解说', '视频'],
    links: [
      {
        label: 'Bilibili（链接待补充）',
        url: '',
        icon: 'fab fa-bilibili',
        placeholder: true
      }
    ]
  }
]

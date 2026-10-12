import { useState } from 'react'
import './App.css'

type PlatformKey = 'TikTok' | 'LinkedIn' | 'Instagram' | 'Facebook'

type PlatformVersion = {
  caption: string
  length: number
  hashtags: string[]
  tone: string
}

const platforms: { key: PlatformKey; icon: string; isConnected: boolean; status: string }[] = [
  { key: 'TikTok', icon: '♪', isConnected: true, status: 'Connected' },
  { key: 'LinkedIn', icon: 'in', isConnected: true, status: 'Connected' },
  { key: 'Instagram', icon: '◎', isConnected: false, status: 'Needs reconnect' },
  { key: 'Facebook', icon: 'f', isConnected: true, status: 'Connected' },
]

const dashboardStats = [
  { label: 'Scheduled posts', value: '24', trend: '+6 this week' },
  { label: 'Reply rate', value: '81%', trend: '+12% vs last week' },
  { label: 'Drafts', value: '9', trend: '3 ready to review' },
  { label: 'Platform health', value: '96%', trend: 'All accounts online' },
]

const masterContent = {
  title: 'Spring product launch teaser',
  caption:
    'Our new workflow dashboard is built for busy founders who need one place to plan, post, and respond to comments. We designed it to save time without sacrificing quality.',
  hashtags: ['#brandstrategy', '#contentops', '#marketing'],
}

const platformVersions: Record<PlatformKey, PlatformVersion> = {
  TikTok: {
    caption:
      'POV: your content calendar finally feels under control 👀\n\nOne dashboard. Four platforms. Less busywork.\n\nWe built a smarter way to plan, repurpose, and publish without rewriting the same idea 4 times.\n\n#socialmediamarketing #contentstrategy #creatorworkflow',
    length: 196,
    hashtags: ['#creatorworkflow', '#socialmediamarketing', '#contentops'],
    tone: 'short, punchy, hook-first',
  },
  LinkedIn: {
    caption:
      'A lot of marketing teams are still managing content in spreadsheets, scattered docs, and disconnected social tools. The result is a lot of repetition and not enough speed.\n\nWe built a simpler workflow for businesses that need to create once and publish everywhere. The dashboard helps teams turn one master idea into platform-ready captions, schedule posts, and respond to comments without jumping between tools.\n\nThe goal is simple: save time while keeping brand voice consistent.\n\n#ContentStrategy #SocialMedia #MarketingOps',
    length: 742,
    hashtags: ['#ContentStrategy', '#SocialMedia', '#MarketingOps'],
    tone: 'professional and strategic',
  },
  Instagram: {
    caption:
      'Your content workflow does not need to be chaotic ✨\n\nWe made it easier to plan, repurpose, and post without losing your voice across channels.\n\nOne idea. Multiple versions. Better flow.\n\nSave this for your next launch week.\n\n#branddesign #contentcreation #socialgrowth',
    length: 324,
    hashtags: ['#branddesign', '#contentcreation', '#socialgrowth'],
    tone: 'warm and creative',
  },
  Facebook: {
    caption:
      'We know how much effort goes into creating content for every platform. That is why we built a dashboard that helps teams plan once and share across channels without the extra admin work.\n\nFrom scheduling to replies, everything is in one place.\n\nIf you are managing content for a small business, this gives you more time to focus on the idea, not the process.\n\n#SmallBusinessMarketing #ContentPlanning #SocialMedia',
    length: 418,
    hashtags: ['#SmallBusinessMarketing', '#ContentPlanning', '#SocialMedia'],
    tone: 'friendly and practical',
  },
}

const calendarItems = [
  { date: 'Tue 12', platform: 'TikTok', status: 'Scheduled', time: '09:30', title: 'Product teaser' },
  { date: 'Wed 13', platform: 'LinkedIn', status: 'Published', time: '12:00', title: 'Thought leadership post' },
  { date: 'Thu 14', platform: 'Instagram', status: 'Draft', time: '17:15', title: 'Reel concept' },
  { date: 'Fri 15', platform: 'Facebook', status: 'Queued', time: '08:00', title: 'Community update' },
]

const commentInbox = [
  { author: 'Leah A.', platform: 'Instagram', post: 'Launch teaser', message: 'Love this! Can you share the pricing details?', status: 'Unread' },
  { author: 'Marcus T.', platform: 'LinkedIn', post: 'Thought leadership post', message: 'This is useful — would love a case study example.', status: 'Resolved' },
  { author: 'Nia P.', platform: 'Facebook', post: 'Community update', message: 'Please tell me how I can book a demo.', status: 'Unread' },
]

const aiPrompts = ['Shorten this caption', 'Add a CTA', 'Make it more playful', 'Professional tone']

function App() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>('LinkedIn')
  const [prompt, setPrompt] = useState('Write a caption that feels authentic and conversion-focused.')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-name">SproutFlow</p>
            <span className="brand-subtitle">Content Studio</span>
          </div>
        </div>

        <nav className="nav-menu" aria-label="Sidebar navigation">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Composer</button>
          <button className="nav-item">Calendar</button>
          <button className="nav-item">Inbox</button>
          <button className="nav-item">Media</button>
          <button className="nav-item">Settings</button>
        </nav>

        <div className="account-box">
          <p className="section-label">Connected accounts</p>
          {platforms.map(({ key, icon, status, isConnected }) => (
            <div key={key} className="account-row">
              <span className="platform-badge small-badge">{icon}</span>
              <span>{key}</span>
              <span className={`status-dot ${isConnected ? 'online' : 'warning'}`}></span>
              <span className="status-text">{status}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operations dashboard</p>
            <h1>Social content studio</h1>
          </div>
          <div className="topbar-actions">
            <button className="button secondary">Export</button>
            <button className="button primary">New post</button>
          </div>
        </header>

        <section className="stats-grid">
          {dashboardStats.map(({ label, value, trend }) => (
            <article key={label} className="stat-card">
              <p>{label}</p>
              <div className="stat-row">
                <strong>{value}</strong>
                <span>{trend}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="composer-layout">
          <div className="composer-panel panel">
            <div className="panel-header">
              <div>
                <p className="section-label">Master content</p>
                <h2>Spring product launch teaser</h2>
              </div>
              <button className="button secondary">Save draft</button>
            </div>

            <div className="master-form">
              <label>
                Internal title
                <input value={masterContent.title} readOnly />
              </label>

              <label>
                Master caption
                <textarea value={masterContent.caption} readOnly />
              </label>

              <div className="field-row">
                <label>
                  Optional link
                  <input value="https://sproutflow.app/launch" readOnly />
                </label>
                <label>
                  Hashtags
                  <input value={masterContent.hashtags.join(' ')} readOnly />
                </label>
              </div>
            </div>

            <div className="platform-select">
              {platforms.map(({ key, icon }) => (
                <button
                  key={key}
                  type="button"
                  className={activePlatform === key ? 'platform-chip active' : 'platform-chip'}
                  onClick={() => setActivePlatform(key)}
                >
                  <span className="platform-badge">{icon}</span>
                  {key}
                </button>
              ))}
            </div>

            <div className="platform-version-card">
              <div className="version-header">
                <div>
                  <p className="section-label">Platform version</p>
                  <h3>{activePlatform}</h3>
                </div>
                <span className="tone-pill">{platformVersions[activePlatform].tone}</span>
              </div>

              <div className="meta-line">
                <span>{platformVersions[activePlatform].length} characters</span>
                <span className="warning">Within limit</span>
              </div>

              <textarea value={platformVersions[activePlatform].caption} readOnly />

              <div className="hashtags-row">
                {platformVersions[activePlatform].hashtags.map((tag) => (
                  <span key={tag} className="tag-item">{tag}</span>
                ))}
              </div>

              <div className="inline-actions">
                <button className="button secondary">Regenerate</button>
                <button className="button secondary">Reset to master</button>
                <button className="button primary">Publish now</button>
              </div>
            </div>
          </div>

          <aside className="ai-panel panel">
            <div className="panel-header compact">
              <div>
                <p className="section-label">AI assistant</p>
                <h2>Caption coach</h2>
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="ai-input"
            />

            <div className="prompt-chips">
              {aiPrompts.map((promptText) => (
                <button key={promptText} type="button" className="chip-button">
                  {promptText}
                </button>
              ))}
            </div>

            <div className="ai-options">
              <div className="option-card">
                <strong>Option A</strong>
                <p>Short, punchy, and conversion-focused with a clear CTA.</p>
              </div>
              <div className="option-card">
                <strong>Option B</strong>
                <p>Warm and authentic with a softer tone and stronger story arc.</p>
              </div>
              <div className="option-card">
                <strong>Option C</strong>
                <p>Professional leadership positioning for a broader B2B audience.</p>
              </div>
            </div>

            <button className="button primary full-width">Use selected option</button>
          </aside>
        </section>

        <section className="lower-grid">
          <div className="panel calendar-panel">
            <div className="panel-header">
              <div>
                <p className="section-label">Content calendar</p>
                <h2>Upcoming posts</h2>
              </div>
              <button className="button secondary">Filter</button>
            </div>

            <div className="calendar-list">
              {calendarItems.map(({ date, platform, status, time, title }) => (
                <div key={`${date}-${platform}`} className="calendar-item">
                  <div className="date-block">
                    <span>{date}</span>
                  </div>
                  <div className="calendar-copy">
                    <div className="item-row">
                      <span className="platform-badge small-badge">{platform.slice(0, 2)}</span>
                      <strong>{title}</strong>
                    </div>
                    <div className="item-meta">
                      <span>{platform}</span>
                      <span>{time}</span>
                    </div>
                  </div>
                  <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel inbox-panel">
            <div className="panel-header">
              <div>
                <p className="section-label">Engagement inbox</p>
                <h2>Comments</h2>
              </div>
              <button className="button secondary">Reply all</button>
            </div>

            <div className="comment-list">
              {commentInbox.map(({ author, platform, post, message, status }) => (
                <article key={`${author}-${post}`} className="comment-item">
                  <div className="comment-topline">
                    <strong>{author}</strong>
                    <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
                  </div>
                  <p className="comment-meta">
                    {platform} · {post}
                  </p>
                  <p>{message}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

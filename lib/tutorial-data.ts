// Tutorial step type
export interface TutorialStep {
  title: string
  content: string
  image?: string
}

// Tutorial data organized by tutorial ID
const tutorials: Record<string, TutorialStep[]> = {
  "data-management": [
    {
      title: "Welcome to Data Management",
      content: `
        <p>The Data Management section allows you to export, import, and backup your project data.</p>
        <p>This tutorial will guide you through the main features of this section.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Exporting Data",
      content: `
        <p>The <strong>Export Data</strong> tab allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Select which data types to export</li>
          <li>Choose between CSV, JSON, or Excel formats</li>
          <li>Set a date range for the exported data</li>
        </ul>
        <p class="mt-2">Click the "Export Data" button when you're ready to download your data.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Importing Data",
      content: `
        <p>The <strong>Import Data</strong> tab allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Upload data files in CSV, JSON, or Excel formats</li>
          <li>Configure import options like overwriting existing data</li>
          <li>Validate data before importing</li>
        </ul>
        <p class="mt-2 text-yellow-500">⚠️ Be careful when enabling the "Overwrite existing data" option as it will replace your current data.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Backup & Restore",
      content: `
        <p>The <strong>Backup & Restore</strong> tab allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Create backups of your entire project data</li>
          <li>View a list of previous backups with details</li>
          <li>Restore your project from a previous backup</li>
          <li>Delete old backups you no longer need</li>
        </ul>
        <p class="mt-2">We recommend creating regular backups to prevent data loss.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "supabase-integration": [
    {
      title: "Welcome to Supabase Integration",
      content: `
        <p>Supabase integration allows you to replace local storage with a robust database solution for persistent data across devices and users.</p>
        <p>This tutorial will guide you through setting up Supabase with your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Getting Your Supabase Credentials",
      content: `
        <p>To connect to Supabase, you'll need:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Your Supabase project URL</li>
          <li>Your anon/public key</li>
          <li>Your service role key (for server operations)</li>
        </ul>
        <p class="mt-2">You can find these in your Supabase project dashboard under Project Settings > API.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Configuring Authentication",
      content: `
        <p>Enabling authentication allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Use Supabase for user sign-up and login</li>
          <li>Implement row-level security for data protection</li>
          <li>Support multiple authentication providers (email, social, etc.)</li>
        </ul>
        <p class="mt-2">Toggle the "Enable Authentication" switch to use Supabase for user management.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Enabling Realtime Updates",
      content: `
        <p>Realtime updates allow for collaborative features:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>See changes made by other users in real-time</li>
          <li>Build collaborative editing features</li>
          <li>Create live dashboards that update automatically</li>
        </ul>
        <p class="mt-2">Toggle the "Enable Realtime" switch to enable these features.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Testing Your Connection",
      content: `
        <p>Before finalizing your setup:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Click the "Test Connection" button to verify your credentials</li>
          <li>If successful, click "Connect" to save your configuration</li>
          <li>If unsuccessful, double-check your credentials and try again</li>
        </ul>
        <p class="mt-2">Once connected, your project will start using Supabase for data storage.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "blob-integration": [
    {
      title: "Welcome to Vercel Blob Integration",
      content: `
        <p>Vercel Blob integration enhances file and audio storage with CDN-backed storage for better performance and reliability.</p>
        <p>This tutorial will guide you through setting up Vercel Blob with your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Getting Your Blob Token",
      content: `
        <p>To connect to Vercel Blob, you'll need:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>A Vercel Blob read-write token</li>
        </ul>
        <p class="mt-2">You can generate this token in your Vercel project settings under Storage > Blob.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Configuring Cache Control",
      content: `
        <p>Cache control determines how files are cached:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Controls how browsers and CDNs cache your files</li>
          <li>Affects performance and freshness of content</li>
          <li>Default setting works well for most use cases</li>
        </ul>
        <p class="mt-2">The default setting "public, max-age=31536000, immutable" is optimized for static assets that don't change.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Enabling Storage Types",
      content: `
        <p>You can choose which types of storage to enable:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>File Storage: For documents, images, and other files</li>
          <li>Audio Storage: For audio recordings and music files</li>
        </ul>
        <p class="mt-2">Toggle the switches to enable or disable each storage type.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Testing Your Connection",
      content: `
        <p>Before finalizing your setup:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Click the "Test Connection" button to verify your token</li>
          <li>If successful, click "Connect" to save your configuration</li>
          <li>If unsuccessful, double-check your token and try again</li>
        </ul>
        <p class="mt-2">Once connected, your project will start using Vercel Blob for file storage.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "google-sheets-integration": [
    {
      title: "Welcome to Google Sheets Integration",
      content: `
        <p>Google Sheets integration enables data export/import with Google Sheets for easier data management.</p>
        <p>This tutorial will guide you through setting up Google Sheets with your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Finding Your Google Sheet ID",
      content: `
        <p>To connect to Google Sheets, you'll need:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Your Google Sheet ID</li>
          <li>The name of the tab in your sheet</li>
        </ul>
        <p class="mt-2">You can find the Sheet ID in the URL of your Google Sheet: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Setting Up Sheet Tab",
      content: `
        <p>The Sheet Tab Name is important:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>This is the specific tab where data will be stored</li>
          <li>Default is "Components" but you can customize it</li>
          <li>Make sure the tab exists in your Google Sheet</li>
        </ul>
        <p class="mt-2">If the tab doesn't exist, it will be created automatically during the first sync.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Auto Sync Configuration",
      content: `
        <p>Enabling Auto Sync provides these benefits:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Automatically sync data at regular intervals</li>
          <li>Keep your Google Sheet up-to-date without manual exports</li>
          <li>Set custom sync intervals based on your needs</li>
        </ul>
        <p class="mt-2">If enabled, you can set how often (in minutes) the sync should occur.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Testing Your Connection",
      content: `
        <p>Before finalizing your setup:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Click the "Test Connection" button to verify access to your sheet</li>
          <li>If successful, click "Connect" to save your configuration</li>
          <li>If unsuccessful, check your Sheet ID and permissions</li>
        </ul>
        <p class="mt-2">Make sure your Google Sheet is shared with the service account email if you're using one.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "ai-integration": [
    {
      title: "Welcome to AI Integration",
      content: `
        <p>AI integration adds intelligent capabilities to your project for component analysis, documentation generation, and more.</p>
        <p>This tutorial will guide you through setting up AI features with your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Setting Up Your API Key",
      content: `
        <p>To connect to AI services, you'll need:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>An API key from your AI provider</li>
          <li>Select which AI model to use</li>
        </ul>
        <p class="mt-2">You can get an API key from providers like OpenAI, Anthropic, or others.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Choosing an AI Model",
      content: `
        <p>Different models have different capabilities:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>GPT-4o: Most advanced, best for complex analysis</li>
          <li>GPT-3.5 Turbo: Faster and more cost-effective</li>
          <li>Claude models: Alternative with different strengths</li>
        </ul>
        <p class="mt-2">Choose based on your needs for quality, speed, and cost.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Enabling AI Features",
      content: `
        <p>You can enable various AI capabilities:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Component Analysis: Get quality and improvement suggestions</li>
          <li>Documentation Generation: Automatically create documentation</li>
          <li>Task Prioritization: Get AI-powered suggestions for task order</li>
        </ul>
        <p class="mt-2">Toggle the switches to enable or disable each feature.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Testing Your Connection",
      content: `
        <p>Before finalizing your setup:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Click the "Test Connection" button to verify your API key</li>
          <li>If successful, click "Connect" to save your configuration</li>
          <li>If unsuccessful, double-check your API key and try again</li>
        </ul>
        <p class="mt-2">Once connected, AI features will be available throughout your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "api-integration": [
    {
      title: "Welcome to API Access Configuration",
      content: `
        <p>API access allows external applications to interact with your project data securely.</p>
        <p>This tutorial will guide you through setting up API access for your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Enabling API Access",
      content: `
        <p>First, you need to enable API access:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Toggle the "Enable API Access" switch to on</li>
          <li>This will reveal additional configuration options</li>
          <li>You can disable this at any time to revoke access</li>
        </ul>
        <p class="mt-2">When enabled, external applications can access your data with the proper authentication.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Managing API Keys",
      content: `
        <p>API keys are used for authentication:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Click "Generate" to create a new API key</li>
          <li>Copy the key and store it securely</li>
          <li>You can regenerate the key if it's compromised</li>
        </ul>
        <p class="mt-2 text-yellow-500">⚠️ Keep your API key secret! Anyone with this key can access your data.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Configuring CORS",
      content: `
        <p>CORS controls which domains can access your API:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Enter allowed origins in the "Allowed Origins" field</li>
          <li>Use comma-separated URLs (e.g., https://example.com)</li>
          <li>Use * to allow all origins (not recommended for production)</li>
        </ul>
        <p class="mt-2">For security, only allow specific domains that need access to your API.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Rate Limiting",
      content: `
        <p>Rate limiting protects your API from abuse:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Toggle "Enable Rate Limiting" to protect your API</li>
          <li>Set the maximum requests per minute</li>
          <li>This prevents excessive usage and potential DoS attacks</li>
        </ul>
        <p class="mt-2">A good starting point is 60 requests per minute, but adjust based on your needs.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
  "platform-overview": [
    {
      title: "Welcome to Component Tracker",
      content: `
        <p>Welcome to the Component Tracker platform! This tutorial will guide you through the main features and help you get started.</p>
        <p>Click "Next" to begin your tour.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Dashboard Overview",
      content: `
        <p>The Dashboard provides an overview of your project:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>See key metrics and statistics at a glance</li>
          <li>View recent activity and updates</li>
          <li>Access quick links to common actions</li>
        </ul>
        <p class="mt-2">This is your starting point for navigating the platform.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Components Management",
      content: `
        <p>The Components section allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Create and manage project components</li>
          <li>Track component status and progress</li>
          <li>Assign components to team members</li>
          <li>Set priorities and due dates</li>
        </ul>
        <p class="mt-2">Click "New Component" to create your first component.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "File Management",
      content: `
        <p>The Files section allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Upload and store project files</li>
          <li>Organize files by component</li>
          <li>Share files with team members</li>
          <li>Track file versions</li>
        </ul>
        <p class="mt-2">Files can be associated with specific components for better organization.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Team Collaboration",
      content: `
        <p>The Team section allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>View and manage team members</li>
          <li>Assign roles and permissions</li>
          <li>Track member workload and assignments</li>
          <li>Communicate with team members</li>
        </ul>
        <p class="mt-2">Effective collaboration is key to successful project management.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Analytics & Reporting",
      content: `
        <p>The Analytics section provides insights:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>View component status distribution</li>
          <li>Track progress over time</li>
          <li>Analyze team performance</li>
          <li>Identify bottlenecks and issues</li>
        </ul>
        <p class="mt-2">Use these insights to make data-driven decisions for your project.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Integrations Hub",
      content: `
        <p>The Integrations section allows you to:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Connect to external services and tools</li>
          <li>Enhance platform functionality</li>
          <li>Automate workflows and processes</li>
          <li>Extend data storage capabilities</li>
        </ul>
        <p class="mt-2">Explore available integrations to customize your experience.</p>
      `,
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
}

/**
 * Get tutorial steps by tutorial ID
 */
export function getTutorialSteps(tutorialId: string): TutorialStep[] {
  return tutorials[tutorialId] || []
}

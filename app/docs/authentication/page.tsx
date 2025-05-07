import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Authentication Documentation",
  description: "Documentation for the authentication system.",
}

export default function AuthenticationDocsPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Authentication Documentation</h2>
          <p className="text-sm text-muted-foreground">Learn about the authentication system used in the application</p>
        </div>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Authentication System</AlertTitle>
        <AlertDescription>
          This application uses a combination of JWT tokens and OAuth providers for authentication.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="email">Email Auth</TabsTrigger>
          <TabsTrigger value="google">Google Auth</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Overview</CardTitle>
              <CardDescription>How the authentication system works in this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Authentication Flow</h3>
              <p>
                The application uses a token-based authentication system with JWT (JSON Web Tokens). When a user logs
                in, the server generates a JWT token that is stored in the browser and used for subsequent API requests.
              </p>

              <h3 className="text-lg font-medium">Authentication Methods</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email/Password:</strong> Traditional email and password authentication with email
                  verification.
                </li>
                <li>
                  <strong>Google OAuth:</strong> Sign in with Google using OAuth 2.0.
                </li>
              </ul>

              <h3 className="text-lg font-medium">Security Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email Verification:</strong> Users who register with email/password must verify their email
                  address before they can access the application.
                </li>
                <li>
                  <strong>Password Reset:</strong> Users can reset their password if they forget it.
                </li>
                <li>
                  <strong>Session Management:</strong> Users can view and manage their active sessions.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Authentication</CardTitle>
              <CardDescription>How email authentication works in this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Registration Process</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>User enters email, password, and other required information.</li>
                <li>System validates the input and creates a new user account.</li>
                <li>System sends a verification email to the user's email address.</li>
                <li>User clicks the verification link in the email.</li>
                <li>System verifies the email address and activates the account.</li>
                <li>User can now log in to the application.</li>
              </ol>

              <h3 className="text-lg font-medium">Password Reset Process</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>User clicks "Forgot Password" on the login page.</li>
                <li>User enters their email address.</li>
                <li>System sends a password reset email to the user's email address.</li>
                <li>User clicks the password reset link in the email.</li>
                <li>User enters a new password.</li>
                <li>System updates the user's password.</li>
                <li>User can now log in with the new password.</li>
              </ol>

              <h3 className="text-lg font-medium">Email Verification</h3>
              <p>
                Email verification is handled using a combination of unique tokens and verification codes. The system
                generates a unique token for each verification request and sends it to the user's email address. The
                user then enters the verification code on the verification page to complete the process.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Authentication</CardTitle>
              <CardDescription>How Google authentication works in this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">OAuth 2.0 Flow</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>User clicks "Sign in with Google" on the login page.</li>
                <li>User is redirected to Google's authentication page.</li>
                <li>User logs in to their Google account and grants permission to the application.</li>
                <li>Google redirects the user back to the application with an authorization code.</li>
                <li>The application exchanges the authorization code for an access token.</li>
                <li>The application uses the access token to retrieve the user's profile information.</li>
                <li>The application creates a new user account or logs in the existing user.</li>
              </ol>

              <h3 className="text-lg font-medium">Permissions</h3>
              <p>The application requests the following permissions from Google:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>profile:</strong> Access to the user's basic profile information.
                </li>
                <li>
                  <strong>email:</strong> Access to the user's email address.
                </li>
              </ul>

              <h3 className="text-lg font-medium">Account Linking</h3>
              <p>
                If a user signs in with Google and their email address matches an existing account, the application will
                link the Google account to the existing account. This allows users to sign in with either method.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Authentication API endpoints and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Authentication Endpoints</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">POST /api/auth/register</h4>
                  <p className="text-sm text-muted-foreground">Register a new user account</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">POST /api/auth/login</h4>
                  <p className="text-sm text-muted-foreground">Log in to an existing user account</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`{
  "email": "user@example.com",
  "password": "password123"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">POST /api/auth/verify-email</h4>
                  <p className="text-sm text-muted-foreground">Verify a user's email address</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`{
  "token": "verification-token",
  "code": "123456"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">POST /api/auth/forgot-password</h4>
                  <p className="text-sm text-muted-foreground">Request a password reset email</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`{
  "email": "user@example.com"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">POST /api/auth/reset-password</h4>
                  <p className="text-sm text-muted-foreground">Reset a user's password</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`{
  "token": "reset-token",
  "password": "new-password123"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">GET /api/auth/me</h4>
                  <p className="text-sm text-muted-foreground">Get the current user's profile</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`// Headers
{
  "Authorization": "Bearer {jwt-token}"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">POST /api/auth/logout</h4>
                  <p className="text-sm text-muted-foreground">Log out the current user</p>
                  <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    {`// Headers
{
  "Authorization": "Bearer {jwt-token}"
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-lg font-medium">Authentication Headers</h3>
              <p>All authenticated API requests must include the JWT token in the Authorization header:</p>
              <pre className="mt-2 rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                {`Authorization: Bearer {jwt-token}`}
              </pre>

              <h3 className="text-lg font-medium">Error Handling</h3>
              <p>Authentication errors return appropriate HTTP status codes and error messages:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>401 Unauthorized:</strong> Invalid credentials or missing token.
                </li>
                <li>
                  <strong>403 Forbidden:</strong> Valid token but insufficient permissions.
                </li>
                <li>
                  <strong>422 Unprocessable Entity:</strong> Invalid input data.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

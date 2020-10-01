import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { Amplify } from "@aws-amplify/core"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import awsconfig from "../aws-exports"
import TaskList from "../components/TaskList"
Amplify.configure(awsconfig)
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <AmplifyAuthenticator>
        <AmplifySignOut />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <TaskList />
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </AmplifyAuthenticator>
    </Layout>
  )
}

export default IndexPage

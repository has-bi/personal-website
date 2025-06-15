// test-notion.js - Run this to test your Notion connection
const { Client } = require("@notionhq/client");

// Replace with your actual values
const NOTION_API_KEY = "***REDACTED***";
const BLOG_DATABASE_ID = "213499f6b4e980c8bff0f3d409888de3";
const PROJECTS_DATABASE_ID = "213499f6b4e980bb807ac10d9dbf2fbd";

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function testNotionConnection() {
  console.log("🧪 Testing Notion Connection...\n");

  // Test 1: Check if API key works
  try {
    console.log("1. Testing API Key...");
    const users = await notion.users.list({});
    console.log("✅ API Key is valid!");
  } catch (error) {
    console.log("❌ API Key failed:", error.message);
    return;
  }

  // Test 2: Check Blog Database
  try {
    console.log("\n2. Testing Blog Database...");
    const blogDb = await notion.databases.retrieve({
      database_id: BLOG_DATABASE_ID,
    });
    console.log(
      "✅ Blog Database found:",
      blogDb.title[0]?.plain_text || "Untitled"
    );

    // Show properties
    console.log("   Properties:");
    Object.keys(blogDb.properties).forEach((prop) => {
      console.log(`   - ${prop} (${blogDb.properties[prop].type})`);
    });
  } catch (error) {
    console.log("❌ Blog Database failed:", error.message);
  }

  // Test 3: Check Projects Database
  try {
    console.log("\n3. Testing Projects Database...");
    const projectsDb = await notion.databases.retrieve({
      database_id: PROJECTS_DATABASE_ID,
    });
    console.log(
      "✅ Projects Database found:",
      projectsDb.title[0]?.plain_text || "Untitled"
    );

    // Show properties
    console.log("   Properties:");
    Object.keys(projectsDb.properties).forEach((prop) => {
      console.log(`   - ${prop} (${projectsDb.properties[prop].type})`);
    });
  } catch (error) {
    console.log("❌ Projects Database failed:", error.message);
  }

  // Test 4: Try to query blog posts
  try {
    console.log("\n4. Testing Blog Query...");
    const blogPosts = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      page_size: 5,
    });
    console.log(`✅ Found ${blogPosts.results.length} blog posts`);

    blogPosts.results.forEach((post, index) => {
      const title = post.properties.Title?.title?.[0]?.plain_text || "No title";
      console.log(`   ${index + 1}. ${title}`);
    });
  } catch (error) {
    console.log("❌ Blog Query failed:", error.message);
  }

  // Test 5: Try to query projects
  try {
    console.log("\n5. Testing Projects Query...");
    const projects = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
      page_size: 5,
    });
    console.log(`✅ Found ${projects.results.length} projects`);

    projects.results.forEach((project, index) => {
      const title =
        project.properties.Title?.title?.[0]?.plain_text || "No title";
      console.log(`   ${index + 1}. ${title}`);
    });
  } catch (error) {
    console.log("❌ Projects Query failed:", error.message);
  }

  console.log("\n🎉 Test completed!");
}

testNotionConnection();

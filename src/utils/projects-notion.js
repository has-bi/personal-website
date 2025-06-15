// src/utils/projects-notion.js - New Notion-based projects utils
import { getProjectsFromNotion, getProjectFromNotion } from "./notion";

export async function getAllProjectSlugs() {
  try {
    const projects = await getProjectsFromNotion();
    return projects.map((project) => project.slug);
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const projects = await getProjectsFromNotion();
    return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    const projects = await getProjectsFromNotion();
    return projects.filter((project) => project.featured);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProject(slug) {
  try {
    return await getProjectFromNotion(slug);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getProjectsByCategory(category) {
  try {
    const projects = await getProjectsFromNotion();
    return projects.filter(
      (project) => project.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const projects = await getProjectsFromNotion();
    const categories = new Set();
    projects.forEach((project) => {
      if (project.category) {
        categories.add(project.category);
      }
    });
    return Array.from(categories).sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProjectsByTechnology(technology) {
  try {
    const projects = await getProjectsFromNotion();
    return projects.filter(
      (project) =>
        project.technologies &&
        project.technologies.some(
          (tech) => tech.toLowerCase() === technology.toLowerCase()
        )
    );
  } catch (error) {
    console.error("Error fetching projects by technology:", error);
    return [];
  }
}

export async function getAllTechnologies() {
  try {
    const projects = await getProjectsFromNotion();
    const technologies = new Set();
    projects.forEach((project) => {
      if (project.technologies) {
        project.technologies.forEach((tech) => technologies.add(tech));
      }
    });
    return Array.from(technologies).sort();
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return [];
  }
}

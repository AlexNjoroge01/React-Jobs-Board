import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check if environment variables are set (Upstash uses KV_REST_API_URL and KV_REST_API_TOKEN)
    const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!redisUrl || !redisToken) {
      console.error('Missing Upstash Redis environment variables');
      console.error('Looking for: KV_REST_API_URL, KV_REST_API_TOKEN, UPSTASH_REDIS_REST_URL, or UPSTASH_REDIS_REST_TOKEN');
      return res.status(500).json({ 
        message: 'Server configuration error', 
        error: 'Redis environment variables not configured. Need KV_REST_API_URL and KV_REST_API_TOKEN' 
      });
    }

    // Initialize Redis client
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    if (req.method === 'GET') {
      // Get all jobs
      let jobs = await redis.get('jobs');
      
      // Ensure jobs is an array (handle null or non-array responses)
      if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
        jobs = [
          {
            id: "1",
            title: "Senior Python Developer (Django/FastAPI)",
            type: "Full-Time",
            description: "Africas Talking is looking for a Senior Python Developer to build scalable backend APIs and microservices. You will work with Django and FastAPI to develop payment processing systems, SMS gateways, and developer tools used by thousands of businesses across Africa.",
            location: "Nairobi, Kenya",
            salary: "KSh 280,000 - 350,000",
            company: {
              name: "Africas Talking",
              description: "Africas Talking is a leading African communications platform as a service (CPaaS) provider, powering SMS, voice, airtime and payments for startups and enterprises across the continent.",
              contactEmail: "careers@africastalking.com",
              contactPhone: "+254 700 000001"
            }
          },
          {
            id: "2",
            title: "Go Backend Engineer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Safaricom is hiring a Go Backend Engineer to build high-performance microservices for our M-Pesa platform. You will work on distributed systems handling millions of transactions daily, focusing on concurrency, performance optimization and system reliability.",
            salary: "KSh 300,000 - 380,000",
            company: {
              name: "Safaricom PLC",
              description: "Safaricom is Kenya's leading telecommunications company, innovating in mobile, financial and digital services to improve lives and drive economic growth.",
              contactEmail: "techcareers@safaricom.co.ke",
              contactPhone: "+254 722 000002"
            }
          },
          {
            id: "3",
            title: "Solana Blockchain Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "A leading Kenyan fintech startup is seeking a Solana Blockchain Developer to build DeFi applications and smart contracts. You will work on tokenization projects, NFT marketplaces, and cross-chain integrations using Rust and Solana Web3.js.",
            salary: "KSh 350,000 - 450,000",
            company: {
              name: "Kenya Web3 Labs",
              description: "Kenya Web3 Labs is an innovative blockchain technology company building decentralized financial solutions and Web3 infrastructure for the African market.",
              contactEmail: "careers@kenyaweb3.com",
              contactPhone: "+254 733 000003"
            }
          },
          {
            id: "4",
            title: "Java Spring Boot Developer",
            type: "Full-Time",
            description: "Equity Bank is recruiting a Java Spring Boot Developer to build enterprise banking applications and REST APIs. You will work on core banking systems, payment processing, and integration with third-party services using Spring Framework and microservices architecture.",
            location: "Nairobi, Kenya",
            salary: "KSh 320,000 - 400,000",
            company: {
              name: "Equity Bank Kenya",
              description: "Equity Bank is one of East Africa's largest banks, focused on inclusive financial services and digital banking innovation.",
              contactEmail: "digitalcareers@equitybank.co.ke",
              contactPhone: "+254 763 000004"
            }
          },
          {
            id: "5",
            title: "Rust Systems Developer",
            type: "Full-Time",
            description: "A Kenyan fintech company is seeking a Rust Systems Developer to build high-performance payment processing engines and blockchain infrastructure. You will work on memory-safe, concurrent systems handling high transaction volumes with minimal latency.",
            location: "Nairobi, Kenya",
            salary: "KSh 380,000 - 480,000",
            company: {
              name: "FinTech Innovations Kenya",
              description: "FinTech Innovations Kenya is a cutting-edge financial technology company building next-generation payment systems and blockchain solutions for African markets.",
              contactEmail: "engineering@fintechinnovations.co.ke",
              contactPhone: "+254 711 000005"
            }
          },
          {
            id: "6",
            title: "React Frontend Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Twiga Foods is looking for a React Developer to build internal dashboards and logistics tools that support our fresh produce supply chain. You will turn complex workflows into simple, performant interfaces for our operations teams.",
            salary: "KSh 220,000 - 280,000",
            company: {
              name: "Twiga Foods",
              description: "Twiga Foods is a fast-growing Kenyan agritech startup connecting farmers, vendors and retailers through a technology-enabled supply chain.",
              contactEmail: "engineering@twiga.com",
              contactPhone: "+254 733 000006"
            }
          },
          {
            id: "7",
            title: "Python Data Scientist",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "M-Pesa is seeking a Python Data Scientist to build machine learning models for fraud detection, credit scoring, and customer behavior analysis. You will work with pandas, scikit-learn, TensorFlow and large-scale data processing pipelines.",
            salary: "KSh 300,000 - 380,000",
            company: {
              name: "M-Pesa Africa",
              description: "M-Pesa is Africa's leading mobile money platform, enabling millions of people to send money, pay bills and access financial services through their mobile phones.",
              contactEmail: "techjobs@mpesa.com",
              contactPhone: "+254 722 000007"
            }
          },
          {
            id: "8",
            title: "Node.js Backend Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Cellulant is hiring a Node.js Backend Developer to build scalable payment APIs and merchant management systems. You will work with Express.js, TypeScript, and microservices architecture to integrate payment gateways across multiple African markets.",
            salary: "KSh 260,000 - 330,000",
            company: {
              name: "Cellulant",
              description: "Cellulant is a leading African fintech company providing payment solutions that connect merchants, banks and mobile money operators across the continent.",
              contactEmail: "careers@cellulant.com",
              contactPhone: "+254 700 000008"
            }
          },
          {
            id: "9",
            title: "Android Developer (Kotlin/Java)",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "KCB Bank is looking for an Android Developer to build and maintain our mobile banking app. You will work with Kotlin, Java, and modern Android architecture components to deliver secure, user-friendly banking experiences for millions of customers.",
            salary: "KSh 270,000 - 340,000",
            company: {
              name: "KCB Bank Kenya",
              description: "KCB Bank is one of Kenya's largest commercial banks, providing innovative banking solutions and digital financial services to millions of customers.",
              contactEmail: "digitaljobs@kcb.co.ke",
              contactPhone: "+254 711 000009"
            }
          },
          {
            id: "10",
            title: "Vue.js Frontend Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Andela is recruiting a Vue.js Frontend Developer to build modern web applications for global clients. You'll work with Vue 3, TypeScript, Pinia, and collaborate with distributed teams to deliver scalable frontend solutions.",
            salary: "KSh 240,000 - 300,000",
            company: {
              name: "Andela",
              description: "Andela is a global talent network that connects African software developers with leading technology companies worldwide, fostering remote collaboration and career growth.",
              contactEmail: "engineering@andela.com",
              contactPhone: "+254 733 000010"
            }
          },
          {
            id: "11",
            title: "Flutter Mobile Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Sendy is seeking a Flutter Mobile Developer to build cross-platform mobile apps for our logistics platform. You'll create apps for drivers, merchants, and customers using Dart, Firebase, and modern mobile architecture patterns.",
            salary: "KSh 250,000 - 310,000",
            company: {
              name: "Sendy Limited",
              description: "Sendy is a Kenyan logistics and fulfillment startup making it easier for businesses and individuals to move packages and freight across East Africa.",
              contactEmail: "careers@sendy.co.ke",
              contactPhone: "+254 701 000011"
            }
          },
          {
            id: "12",
            title: "DevOps Engineer (Docker/Kubernetes)",
            type: "Full-Time",
            location: "Remote within Kenya",
            description: "A leading Kenyan tech company is looking for a DevOps Engineer to manage cloud infrastructure, CI/CD pipelines, and containerized deployments. You will work with AWS, Docker, Kubernetes, Terraform, and monitoring tools to ensure high availability and scalability.",
            salary: "KSh 320,000 - 400,000",
            company: {
              name: "CloudTech Solutions Kenya",
              description: "CloudTech Solutions Kenya provides cloud infrastructure and DevOps services to startups and enterprises across East Africa, helping them scale efficiently.",
              contactEmail: "careers@cloudtech.co.ke",
              contactPhone: "+254 722 000012"
            }
          },
          {
            id: "13",
            title: "Angular Frontend Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Jumia Kenya is hiring an Angular Frontend Developer to work on our e-commerce platform. You'll build features for product management, seller dashboards, and admin panels using Angular, TypeScript, RxJS, and modern frontend patterns.",
            salary: "KSh 260,000 - 330,000",
            company: {
              name: "Jumia Kenya",
              description: "Jumia is Africa's leading e-commerce platform, connecting millions of customers with sellers across Kenya and the continent.",
              contactEmail: "careers.ke@jumia.com",
              contactPhone: "+254 700 000013"
            }
          },
          {
            id: "14",
            title: "Python Flask Developer",
            type: "Part-Time",
            location: "Remote within Kenya",
            description: "A Kenyan startup is seeking a Part-Time Python Flask Developer to build REST APIs and backend services. This role offers flexible hours and the opportunity to work on innovative fintech and agritech solutions.",
            salary: "KSh 150,000 - 200,000",
            company: {
              name: "StartupHub Kenya",
              description: "StartupHub Kenya is an incubator and technology services provider supporting early-stage startups with development resources and technical expertise.",
              contactEmail: "dev@startuphub.co.ke",
              contactPhone: "+254 711 000014"
            }
          },
          {
            id: "15",
            title: "Full Stack TypeScript Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Tala is recruiting a Full Stack TypeScript Developer to work on both frontend (React) and backend (Node.js/NestJS) systems for our credit platform. You'll build end-to-end features including APIs, user interfaces, and data processing pipelines.",
            salary: "KSh 300,000 - 380,000",
            company: {
              name: "Tala",
              description: "Tala is a global fintech company providing instant credit and financial services to underserved populations through mobile technology and alternative credit scoring.",
              contactEmail: "careers@tala.co",
              contactPhone: "+254 733 000015"
            }
          },
          {
            id: "16",
            title: "Swift iOS Developer",
            type: "Full-Time",
            location: "Nairobi, Kenya",
            description: "Branch is seeking a Swift iOS Developer to build and maintain our financial services iOS app. You'll work with SwiftUI, Combine, Core Data, and modern iOS architecture to deliver secure, performant mobile banking experiences.",
            salary: "KSh 280,000 - 350,000",
            company: {
              name: "Branch International",
              description: "Branch is a mobile-first financial services platform providing instant loans and financial products to underserved customers across Africa and emerging markets.",
              contactEmail: "engineering@branch.co",
              contactPhone: "+254 711 000016"
            }
          }
        ];
        await redis.set('jobs', jobs);
      }

      // Ensure jobs is always an array before returning
      if (!Array.isArray(jobs)) {
        jobs = [];
      }

      // Handle _limit query parameter (for home page showing 3 jobs)
      const limit = req.query._limit;
      if (limit) {
        const limitNum = parseInt(limit, 10);
        return res.status(200).json(jobs.slice(0, limitNum));
      }

      return res.status(200).json(jobs);
    }

    if (req.method === 'POST') {
      // Create new job
      const newJob = req.body;
      
      // Get existing jobs
      let jobs = await redis.get('jobs');
      
      // Ensure jobs is an array
      if (!jobs || !Array.isArray(jobs)) {
        jobs = [];
      }
      
      // Generate new ID (simple increment, you could use UUID if preferred)
      const maxId = jobs.length > 0 
        ? Math.max(...jobs.map(job => parseInt(job.id) || 0))
        : 0;
      newJob.id = String(maxId + 1);
      
      // Add new job
      jobs.push(newJob);
      
      // Save back to Redis
      await redis.set('jobs', jobs);
      
      return res.status(201).json(newJob);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in jobs API:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


export const lessons = [
  {
    id: 1,
    title: "The world of sales engineering",
    description:
      "Where engineering expertise meets customer impact. Find your place in the role.",
    time: 12,
    category: "FOUNDATIONS",
    icon: "compass",
    color: "blue",
    summary:
      "Sales engineers help customers evaluate technical solutions. They partner with account teams, lead discovery, validate requirements, and prove that a solution fits. A Solutions Engineer may focus on cloud architecture; an Applications Engineer may size industrial equipment; a Technical Consultant may advise on implementation. Titles vary, so always read the responsibilities.",
    takeaway:
      "Connect technical decisions to the customer’s operational goals.",
  },
  {
    id: 2,
    title: "Ask better discovery questions",
    description:
      "Uncover the constraints, priorities, and problems behind a customer request.",
    time: 18,
    category: "TECHNICAL DISCOVERY",
    icon: "messages",
    color: "green",
    summary:
      "Start with the current workflow, then investigate pain, impact, constraints, and success criteria. Ask a plant manager how downtime is measured. Ask an engineer about interfaces and timing requirements. Confirm who owns integration and who approves the investment before proposing a solution.",
    takeaway:
      "Ask “What happens when this fails?” before “Which product do you need?”",
  },
  {
    id: 3,
    title: "From needs to requirements",
    description:
      "Turn a customer conversation into measurable technical success criteria.",
    time: 15,
    category: "SOLUTION DESIGN",
    icon: "layers",
    color: "purple",
    summary:
      "Separate desired outcomes from technical requirements. “Improve productivity” is an outcome; “detect a failed part within 100 ms” is a measurable requirement. Document assumptions, legacy protocols, security constraints, acceptance criteria, and ownership. Confirm these with the customer.",
    takeaway:
      "Use a requirements matrix to trace each capability to a customer need.",
  },
  {
    id: 4,
    title: "Build a demo that connects",
    description:
      "Show a technical workflow that makes the customer’s next step clear.",
    time: 20,
    category: "TECHNICAL DEMOS",
    icon: "monitor",
    color: "orange",
    summary:
      "Frame the customer’s problem, demonstrate one relevant workflow, and explain the technical proof. For a cloud observability demo, show how an engineer identifies a failing service, not every dashboard. Agree on evaluation criteria and invite the customer to validate what they saw.",
    takeaway: "Problem → workflow → proof → next step.",
  },
  {
    id: 5,
    title: "Handle technical objections",
    description:
      "Navigate integration, security, and performance concerns with confidence.",
    time: 16,
    category: "CUSTOMER CONVERSATIONS",
    icon: "shield",
    color: "blue",
    summary:
      "Acknowledge the concern, clarify the underlying risk, and provide evidence. If you don’t know, say so and commit to a specific validation step. Never promise unverified compatibility or performance. Propose a proof of concept with shared pass/fail criteria.",
    takeaway:
      "Treat an objection as a requirement to validate, not an argument to win.",
  },
  {
    id: 6,
    title: "One solution, many stakeholders",
    description:
      "Speak to engineers, operators, and decision-makers without losing technical depth.",
    time: 14,
    category: "STAKEHOLDER ALIGNMENT",
    icon: "users",
    color: "purple",
    summary:
      "An engineer needs architectural evidence. An operator needs a workable process. A plant manager needs reliable production. Procurement needs commercial clarity. Adapt the level of detail while keeping the underlying technical claims consistent.",
    takeaway:
      "Map each stakeholder to their decision, concern, and required proof.",
  },
  {
    id: 7,
    title: "Sales engineering on the factory floor",
    description:
      "Explore automation, controls, interoperability, and operational constraints.",
    time: 22,
    category: "INDUSTRY SPOTLIGHT",
    icon: "factory",
    color: "green",
    summary:
      "Industrial automation connects sensors, PLCs, controllers, and supervisory systems. Discover existing protocols, safety requirements, network constraints, and maintenance windows. Plan how to validate a solution without disrupting production and include operations in the evaluation.",
    takeaway:
      "Integration and uptime are part of the solution—not afterthoughts.",
  },
];
export const scenarios = [
  {
    id: "plant",
    title: "Discovery on the factory floor",
    subtitle: "Industrial automation",
    role: "Morgan Ellis",
    job: "Plant Manager · Northline Manufacturing",
    difficulty: "Beginner",
    time: "8–10 min",
    color: "green",
    brief:
      "A manufacturer is exploring condition monitoring for three production lines. Unplanned downtime is rising, but their PLC infrastructure is 12 years old. Lead discovery before recommending a solution.",
    goal: "Understand downtime impact, legacy integration constraints, and what a successful pilot would prove.",
    lines: [
      "We’ve had three unexpected line stops this month. Your sensors look interesting, but I can’t replace our existing PLCs.",
      "Each stop costs about two hours. We use older Modbus controllers, and maintenance only has a four-hour window on Sundays.",
      "That sounds practical. Our controls engineer will want proof that the gateway won’t affect the existing control loop.",
    ],
    choices: [
      [
        "Which lines are most affected, and what is the operational impact of each stop?",
        "Our sensors are the best option. Should we schedule an installation?",
      ],
      [
        "What interfaces are available, and how would you define success for a small pilot?",
        "We can definitely guarantee zero downtime.",
      ],
      [
        "Let’s validate a read-only gateway on one line with your controls engineer. What acceptance criteria should we agree on?",
        "I’m sure the gateway works with everything.",
      ],
    ],
  },
  {
    id: "cloud",
    title: "Make the architecture make sense",
    subtitle: "Cloud & data centers",
    role: "Riley Chen",
    job: "Infrastructure Lead · Stratus Labs",
    difficulty: "Intermediate",
    time: "10–12 min",
    color: "blue",
    brief:
      "An infrastructure lead is evaluating an observability platform for a hybrid cloud deployment. Explain how the solution could fit without promising unverified performance.",
    goal: "Connect architecture, data residency, and evaluation criteria to the customer’s workflow.",
    lines: [
      "Our services span two clouds and an on-prem data center. How would your solution help us isolate incidents?",
      "Data residency is a hard requirement. Some telemetry must stay on-premises.",
      "Our SRE team will need to validate overhead before we expand.",
    ],
    choices: [
      [
        "Which incidents take longest to diagnose, and how do you investigate them today?",
        "You should move everything to a single cloud.",
      ],
      [
        "Let’s map which telemetry must stay local and validate the deployment options.",
        "All data can safely leave your network.",
      ],
      [
        "Let’s define latency and resource limits for a pilot with your SRE team.",
        "There will be no performance overhead.",
      ],
    ],
  },
  {
    id: "embedded",
    title: "Turn an objection into a plan",
    subtitle: "Embedded systems",
    role: "Avery Patel",
    job: "Systems Engineer · Fieldstone Robotics",
    difficulty: "Intermediate",
    time: "6–8 min",
    color: "purple",
    brief:
      "A robotics team questions whether an edge gateway can meet its timing and integration needs. Clarify concerns and propose a technical validation.",
    goal: "Handle a technical objection with evidence and a measurable next step.",
    lines: [
      "Your edge gateway looks good, but we cannot risk missing our control deadlines.",
      "We have a 10 ms loop and a proprietary interface. We’re worried about jitter.",
      "We could test with a replay of our production traffic before connecting hardware.",
    ],
    choices: [
      [
        "What timing constraints and interfaces should we validate together?",
        "It is fast enough for any robotics application.",
      ],
      [
        "Let’s isolate the non-control data path and measure jitter under load.",
        "Latency is never an issue with modern gateways.",
      ],
      [
        "Let’s agree on pass/fail thresholds and review the replay results together.",
        "A demo video should be enough proof.",
      ],
    ],
  },
];
export const candidates = [
  {
    id: 1,
    name: "Alex Morgan",
    initials: "AM",
    school: "Mechanical Engineering · State University",
    interest: "Industrial automation",
    skills: ["Technical discovery", "Systems thinking", "PLC fundamentals"],
    color: "green",
  },
  {
    id: 2,
    name: "Jordan Lee",
    initials: "JL",
    school: "Computer Engineering · Lakeside Institute",
    interest: "Cloud & data centers",
    skills: ["Cloud architecture", "Technical demos", "Python"],
    color: "blue",
  },
  {
    id: 3,
    name: "Sam Rivera",
    initials: "SR",
    school: "Electrical Engineering · Westbridge College",
    interest: "Embedded systems",
    skills: ["Embedded systems", "Requirements", "Customer communication"],
    color: "purple",
  },
];
export const assessments = [
  "Industrial automation discovery",
  "Cloud solution walkthrough",
  "Technical objection handling",
];

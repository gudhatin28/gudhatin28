const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));

document.querySelectorAll('#year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const shell = document.getElementById('assistantShell');
const messages = document.getElementById('assistantMessages');
const input = document.getElementById('assistantInput');
const form = document.getElementById('assistantForm');

const portfolioFacts = {
  strongest: `Nandini’s strongest portfolio signals are: Henrico County for data quality/integration, Freddie Mac for quantitative risk analysis, and the AI & Data Science Salary Intelligence dashboard for Power BI and reporting. The Gym Management project adds research collaboration and systems work.`,
  tools: `Her core toolkit is SQL, Power BI, Python, and Excel. Supporting skills include data cleaning, validation, reconciliation, data visualization, dashboard development, risk analytics, data governance, root-cause analysis, Git/GitHub, and stakeholder communication.`,
  experience: `She worked as a Research Assistant at VCU School of Business from Aug 2025 to Jan 2026, collaborating with a 5-member team over 6 months on a Gym Management & Performance Tracking System. She also worked part-time with Aramark at VCU from Aug 2024 to May 2026 and was recognized as Employee of the Year.`,
  education: `Nandini completed a Master of Science in Information Systems at Virginia Commonwealth University, School of Business, in 2026.`,
  roles: `She is targeting entry-level BI Analyst and Data Analyst roles, especially work involving reporting, data quality, operational analysis, risk, dashboards, or cross-system data.`,
  henrico: `In the Henrico County project, she analyzed fragmented utility and infrastructure asset-data practices and documented 10 data-quality/integration challenges, including duplicate records, missing asset IDs, inconsistent schemas and coordinates, outdated GIS layers, and siloed systems. She contributed to the proposed UADIF framework and a phased implementation roadmap.`,
  mortgage: `In the Freddie Mac mortgage project, she analyzed about 22,500 loan records, evaluated four machine-learning models, investigated credit score/LTV/DTI risk patterns, and compared 0.5%, 1.0%, and 1.5% risk-threshold scenarios. The project estimated the highest-risk 1.5% scenario could represent about $2.06B in potential savings while supporting a 98% purchase objective; this was a projected scenario, not realized savings.`,
  salary: `The AI & Data Science Salary Intelligence project analyzes 3,755 real-world salary observations from 2020–2023. She built a 3-page Power BI dashboard and added a Python validation workflow for row counts, duplicates, missing values, category coverage, and grouped salary summaries.`,
  gym: `The Gym Management & Performance Tracking System was a 6-month research collaboration with a 5-member team. Nandini contributed to Workout History and Dashboard components and used SQL, Excel, and Python to support analysis, reporting, and project deliverables.`,
  compliance: `Her broader work also includes healthcare security and compliance, where she mapped HIPAA, PCI DSS, and NIST 800-53 requirements to access-control, encryption, and logging controls.`,
  contact: `The best way to connect with Nandini is through LinkedIn: linkedin.com/in/gnandinireddy. Her GitHub is github.com/gudhatin28.`
};

function answerQuestion(raw) {
  const q = raw.toLowerCase();
  if (/strong|best project|top project|impress/.test(q)) return portfolioFacts.strongest;
  if (/power bi|dashboard|salary|ai job|data science job/.test(q)) return portfolioFacts.salary;
  if (/henrico|asset|utility|governance|integration/.test(q)) return portfolioFacts.henrico;
  if (/freddie|mortgage|loan|delinquen|risk model|2\.06/.test(q)) return portfolioFacts.mortgage;
  if (/gym|workout|research project/.test(q)) return portfolioFacts.gym;
  if (/experience|worked|job|research assistant|aramark|employee of the year/.test(q)) return portfolioFacts.experience;
  if (/tool|skill|sql|python|excel|technology|tech stack/.test(q)) return portfolioFacts.tools;
  if (/education|degree|vcu|master|school/.test(q)) return portfolioFacts.education;
  if (/role|looking for|target|hire|position/.test(q)) return portfolioFacts.roles;
  if (/hipaa|pci|nist|healthcare|compliance|security/.test(q)) return portfolioFacts.compliance;
  if (/contact|linkedin|github|reach/.test(q)) return portfolioFacts.contact;
  return `I can answer recruiter-style questions about Nandini’s skills, experience, education, Henrico County work, Freddie Mac analysis, Power BI salary dashboard, Gym Management research project, healthcare compliance work, or target roles. Try asking about one of those.`;
}

function addMessage(text, type) {
  if (!messages) return;
  const div = document.createElement('div');
  div.className = type === 'user' ? 'user-message' : 'bot-message';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function openAssistant() {
  if (!shell) return;
  shell.classList.add('open');
  shell.setAttribute('aria-hidden', 'false');
  setTimeout(() => input?.focus(), 80);
}

function closeAssistant() {
  if (!shell) return;
  shell.classList.remove('open');
  shell.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.open-assistant').forEach((btn) => btn.addEventListener('click', openAssistant));
document.querySelectorAll('[data-close-assistant]').forEach((el) => el.addEventListener('click', closeAssistant));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAssistant();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  input.value = '';
  window.setTimeout(() => addMessage(answerQuestion(question), 'bot'), 220);
});

document.querySelectorAll('.assistant-suggestions button').forEach((button) => {
  button.addEventListener('click', () => {
    const question = button.textContent.trim();
    addMessage(question, 'user');
    window.setTimeout(() => addMessage(answerQuestion(question), 'bot'), 180);
  });
});

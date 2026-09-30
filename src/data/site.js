// ————————————————— Site-wide configuration & content —————————————————

export const SITE = {
  name: "Aarohan Academy",
  tagline: "Prepare Today. Perform Tomorrow.",
  founded: 2015,
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "admissions@aarohanacademy.in",
  address: "3rd Floor, EduPark Plaza, Sector 15, Noida, UP 201301",
  hours: "Mon – Sat · 8:00 AM – 8:00 PM",
  hoursShort: "Mon–Sat, 8 AM – 8 PM",
};

export const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_GENERIC = waLink(
  "Hello Aarohan Academy! I would like to know about your courses, batches and the admission process."
);

export const waCourse = (courseTitle) =>
  waLink(
    `Hello Aarohan Academy! I'm interested in the "${courseTitle}" course. Please share the fee structure, batch timings and admission process.`
  );

// ————— Stats —————
export const TRUST_STATS = [
  { value: 10, suffix: "+", label: "Years of Excellence", icon: "Award" },
  { value: 5000, suffix: "+", label: "Students Mentored", icon: "Users" },
  { value: 50, suffix: "+", label: "Expert Faculty", icon: "GraduationCap" },
  { value: 95, suffix: "%", label: "Student Satisfaction", icon: "Heart" },
  { value: 100, suffix: "+", label: "Top-100 Ranks", icon: "Trophy" },
];

// ————— Exam categories (configurable) —————
export const EXAM_CATEGORIES = [
  {
    id: "school",
    icon: "BookOpen",
    title: "School Academics",
    tagline: "Class 8 – 12",
    description:
      "Board-first programs for Class 8 to 12 with NCERT depth, weekly tests and school-sync scheduling.",
    subjects: ["Maths", "Science", "English", "SST"],
    duration: "1 Year",
    exams: ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    id: "engineering",
    icon: "Cog",
    title: "Engineering Entrance",
    tagline: "JEE Main · Advanced",
    description:
      "Two-year and dropper programs for JEE Main, Advanced and state engineering entrances with rank analytics.",
    subjects: ["Physics", "Chemistry", "Maths"],
    duration: "1 – 2 Years",
    exams: ["JEE Main", "JEE Advanced", "State CETs"],
  },
  {
    id: "medical",
    icon: "HeartPulse",
    title: "Medical Entrance",
    tagline: "NEET-UG",
    description:
      "Biology-first NEET programs with NCERT line-by-line coverage, 180-question mocks and error clinics.",
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
    duration: "1 – 2 Years",
    exams: ["NEET-UG"],
  },
  {
    id: "government",
    icon: "Landmark",
    title: "Government Exams",
    tagline: "SSC · Banking · Railway",
    description:
      "Quant, reasoning, English and GK programs with speed drills, sectional tests and interview prep.",
    subjects: ["Quant", "Reasoning", "English", "GK/GS"],
    duration: "6 – 12 Months",
    exams: ["SSC", "Banking", "Railway", "State Exams"],
  },
  {
    id: "foundation",
    icon: "Rocket",
    title: "Foundation",
    tagline: "Olympiads · NTSE",
    description:
      "Early-grades foundation for Olympiads, NTSE-style aptitude and logical reasoning for Classes 6–10.",
    subjects: ["Mental Ability", "Maths", "Science", "Aptitude"],
    duration: "1 Year",
    exams: ["Olympiads", "NTSE", "Foundation"],
  },
];

// ————— Why choose us —————
export const WHY_US = [
  { icon: "GraduationCap", title: "Expert Faculty", text: "IIT, NIT and AIIMS alumni educators with 10–20 years of entrance-exam teaching experience." },
  { icon: "LayoutList", title: "Structured Curriculum", text: "A day-wise academic calendar — every chapter, test and revision planned before the year begins." },
  { icon: "ClipboardCheck", title: "Regular Tests", text: "Weekly chapter tests, fortnightly part-syllabus mocks and full-length simulations on exam pattern." },
  { icon: "UserCheck", title: "Personal Mentorship", text: "A dedicated mentor for every 25 students tracks goals, backlogs, wellbeing and study rhythm." },
  { icon: "MessageCircleQuestion", title: "Doubt Clearing", text: "Daily doubt counters, a 24-hour doubt app and small-group remedial sessions — no question left behind." },
  { icon: "LineChart", title: "Performance Tracking", text: "Micro-level analytics per chapter, per question type and per mistake — shared with parents monthly." },
  { icon: "BookMarked", title: "Updated Study Material", text: "Research-team curated modules, formula sheets and PYQ banks, refreshed with every exam cycle." },
  { icon: "Users2", title: "Parent Updates", text: "Structured monthly PTMs, attendance alerts and test-score reports on WhatsApp — full transparency." },
];

// ————— 6-step learning system —————
export const LEARNING_STEPS = [
  { num: "01", title: "Concept Building", text: "Every chapter begins from zero — theorybuilt through visual models, real examples and board-plus-entrance depth.", icon: "Lightbulb" },
  { num: "02", title: "Guided Practice", text: "Level-wise sheets (Level 1 → 3) solved in class with the faculty, so students learn how to think, not just what to write.", icon: "PenLine" },
  { num: "03", title: "Doubt Resolution", text: "Daily doubt counters, app-based doubt support within 24 hours and one-on-one remedial slots for weak chapters.", icon: "MessageCircleQuestion" },
  { num: "04", title: "Mock Tests", text: "Weekly chapter tests and full-syllabus simulations on OMR/CBT patterns, calibrated to real exam difficulty.", icon: "Timer" },
  { num: "05", title: "Performance Analysis", text: "Every test converts into a report — accuracy, speed, silly-mistake audit and chapter-wise rank, reviewed with your mentor.", icon: "LineChart" },
  { num: "06", title: "Revision & Improvement", text: "Spaced-revision cycles, formula flashcards and error notebooks ensure the syllabus stays exam-ready till the final day.", icon: "RefreshCcw" },
];

// ————— Parent trust points —————
export const PARENT_POINTS = [
  { icon: "FileBarChart", title: "Monthly Progress Reports", text: "Chapter-wise mastery, test trends and mentor remarks delivered as a simple monthly report." },
  { icon: "CalendarCheck", title: "Attendance Tracking", text: "Instant SMS/WhatsApp alert if a class is missed, plus make-up class scheduling." },
  { icon: "ClipboardList", title: "Test Performance Updates", text: "Score, rank and improvement summary after every weekly test — no waiting for PTMs." },
  { icon: "UserCheck", title: "Mentor Interaction", text: "A direct line to your child's mentor for academic or motivation concerns, anytime." },
  { icon: "MessageCircleQuestion", title: "Doubt Support", text: "Parents always know the plan when a child struggles — remedial slots are scheduled proactively." },
  { icon: "NotebookPen", title: "Structured Study Plans", text: "A day-wise home-study timetable, reviewed weekly, so preparation doesn't depend on mood." },
  { icon: "ShieldCheck", title: "Safe Learning Environment", text: "CCTV-monitored campus, verified staff and a strict code of conduct for every batch." },
  { icon: "MessagesSquare", title: "Transparent Communication", text: "No surprises at result time — every term begins with clear goals and honest counselling." },
];

// ————— Gallery —————
export const GALLERY = [
  { img: "https://images.pexels.com/photos/37758542/pexels-photo-37758542.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Classroom", title: "Concept class in session", tall: false },
  { img: "https://images.pexels.com/photos/3231359/pexels-photo-3231359.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Students", title: "Foundation batch, Class 9", tall: true },
  { img: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Faculty", title: "Organic Chemistry masterclass", tall: true },
  { img: "https://images.pexels.com/photos/29210065/pexels-photo-29210065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Infrastructure", title: "Chemistry practical lab", tall: false },
  { img: "https://images.pexels.com/photos/7972741/pexels-photo-7972741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", cat: "Results", title: "Toppers of 2025 felicitation", tall: false },
  { img: "https://images.pexels.com/photos/7092339/pexels-photo-7092339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Classroom", title: "Sunday mock test, Hall A", tall: false },
  { img: "https://images.pexels.com/photos/8363756/pexels-photo-8363756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Awards", title: "Best Faculty Award 2025", tall: true },
  { img: "https://images.pexels.com/photos/8197505/pexels-photo-8197505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Seminars", title: "JEE strategy seminar", tall: false },
  { img: "https://images.pexels.com/photos/30562665/pexels-photo-30562665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", cat: "Events", title: "Annual day celebrations", tall: false },
  { img: "https://images.pexels.com/photos/31139003/pexels-photo-31139003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Infrastructure", title: "Reading hall & library", tall: false },
  { img: "https://images.pexels.com/photos/18870256/pexels-photo-18870256.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", cat: "Students", title: "One-on-one doubt session", tall: true },
  { img: "https://images.pexels.com/photos/39192310/pexels-photo-39192310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", cat: "Events", title: "Batch of 2025 farewell", tall: true },
];

export const GALLERY_CATS = ["All", "Classroom", "Faculty", "Students", "Events", "Seminars", "Awards", "Infrastructure", "Results"];

// ————— Study material —————
export const MATERIALS = [
  { id: 1, title: "Physics Mechanics Master Notes", type: "Notes", subject: "Physics", exam: "JEE", pages: 148, size: "12 MB", desc: "Kinematics to rotation with solved examples and common traps." },
  { id: 2, title: "Organic Chemistry Reaction Map", type: "Notes", subject: "Chemistry", exam: "NEET", pages: 96, size: "9 MB", desc: "Every NCERT reaction, named reaction and reagent chart." },
  { id: 3, title: "Complete Maths Formula Book", type: "Formula Sheet", subject: "Maths", exam: "JEE", pages: 42, size: "4 MB", desc: "Algebra, calculus, coordinate & trigonometry — one book." },
  { id: 4, title: "NEET Biology Line-by-Line NCERT", type: "Notes", subject: "Biology", exam: "NEET", pages: 210, size: "18 MB", desc: "Assertion-reason tagged NCERT highlights for all 38 chapters." },
  { id: 5, title: "JEE Main PYQ Bank 2019–2025", type: "PYQ", subject: "PCM", exam: "JEE", pages: 320, size: "26 MB", desc: "Chapter-wise previous year questions with video-solution keys." },
  { id: 6, title: "NEET PYQ 10-Year Chapterwise", type: "PYQ", subject: "PCB", exam: "NEET", pages: 280, size: "22 MB", desc: "2016–2025 questions arranged by chapter and difficulty." },
  { id: 7, title: "Class 10 Science Board Drills", type: "Practice", subject: "Science", exam: "Boards", pages: 120, size: "8 MB", desc: "CBSE-pattern case studies, diagrams and 5-mark practice sets." },
  { id: 8, title: "Quant Sprint — 2000 Questions", type: "Practice", subject: "Quant", exam: "SSC", pages: 184, size: "11 MB", desc: "Topic-wise speed drills for SSC CGL and Banking prelims." },
  { id: 9, title: "Reasoning Puzzles Pack", type: "Practice", subject: "Reasoning", exam: "Banking", pages: 88, size: "6 MB", desc: "Seating, blood relations, syllogisms — 500 graded puzzles." },
  { id: 10, title: "Full-Length JEE Mock Series A", type: "Mock Test", subject: "PCM", exam: "JEE", pages: 60, size: "5 MB", desc: "10 full papers with OMR sheets and percentile predictors." },
  { id: 11, title: "Physics 45-Min Revision Cards", type: "Revision", subject: "Physics", exam: "NEET", pages: 36, size: "3 MB", desc: "Last-month flashcard deck for formula and graph recall." },
  { id: 12, title: "Physical Chemistry Flash Sheets", type: "Formula Sheet", subject: "Chemistry", exam: "JEE", pages: 30, size: "3 MB", desc: "One page per chapter — formulae, graphs, exceptions." },
];

export const MATERIAL_TYPES = ["All", "Notes", "Formula Sheet", "PYQ", "Practice", "Mock Test", "Revision"];

// ————— Sample mini test —————
export const SAMPLE_TEST = {
  title: "Mini Diagnostic — Physics",
  duration: "10 min",
  questions: [
    {
      q: "A body is projected at 45° with speed 20 m/s. Its range on a horizontal plane is (g = 10 m/s²):",
      options: ["20 m", "40 m", "60 m", "80 m"],
      answer: 1,
    },
    {
      q: "The dimensional formula of Planck's constant is:",
      options: ["[ML²T⁻¹]", "[ML²T⁻²]", "[MLT⁻¹]", "[ML²T⁻³]"],
      answer: 0,
    },
    {
      q: "In a Young's double-slit experiment, if the slit separation is halved and screen distance doubled, fringe width becomes:",
      options: ["2×", "3×", "4×", "Unchanged"],
      answer: 2,
    },
  ],
};

import React, { useState } from 'react';

const GRADES = [
  { label: 'S', points: 10 },
  { label: 'A', points: 9 },
  { label: 'B', points: 8 },
  { label: 'C', points: 7 },
  { label: 'D', points: 6 },
  { label: 'E', points: 5 },
  { label: 'F', points: 0 },
];

let idCounter = 100;
const generateId = () => ++idCounter;

const createInitialCourses = () => [
  { id: 1, name: '', credits: 3, grade: 10 },
  { id: 2, name: '', credits: 3, grade: 10 },
  { id: 3, name: '', credits: 3, grade: 10 },
  { id: 4, name: '', credits: 3, grade: 10 },
];

const createInitialSemesters = () => [
  { id: 1, name: 'Semester 1', gpa: '', credits: 20 },
  { id: 2, name: 'Semester 2', gpa: '', credits: 20 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('gpa');

  // Semester GPA state
  const [courses, setCourses] = useState(createInitialCourses);
  const [gpaResult, setGpaResult] = useState(null);
  const [gpaMsg, setGpaMsg] = useState('');

  // CGPA state
  const [semesters, setSemesters] = useState(createInitialSemesters);
  const [cgpaResult, setCgpaResult] = useState(null);
  const [cgpaMsg, setCgpaMsg] = useState('');

  // GPA Handlers
  const handleCourseChange = (id, field, value) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: generateId(), name: '', credits: 3, grade: 10 },
    ]);
  };

  const handleRemoveCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleResetGpa = () => {
    setCourses(createInitialCourses());
    setGpaResult(null);
    setGpaMsg('');
  };

  const handleCalculateGpa = () => {
    if (courses.length === 0) {
      setGpaResult(null);
      setGpaMsg('Add at least one course.');
      return;
    }

    let tp = 0;
    let tc = 0;

    for (let i = 0; i < courses.length; i++) {
      const cr = parseFloat(courses[i].credits);
      const gp = parseFloat(courses[i].grade);

      if (isNaN(cr) || cr <= 0) {
        setGpaResult(null);
        setGpaMsg(`Enter credits greater than 0 for course ${i + 1}.`);
        return;
      }

      tp += cr * gp;
      tc += cr;
    }

    if (!tc) {
      setGpaResult(null);
      setGpaMsg('Add at least one course.');
      return;
    }

    const val = tp / tc;
    setGpaMsg('');
    setGpaResult({
      val: val.toFixed(2),
      pct: (val * 9.5).toFixed(1) + '%',
      cr: +tc.toFixed(2),
    });
  };

  // CGPA Handlers
  const handleSemesterChange = (id, field, value) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddSemester = () => {
    setSemesters((prev) => [
      ...prev,
      {
        id: generateId(),
        name: `Semester ${prev.length + 1}`,
        gpa: '',
        credits: 20,
      },
    ]);
  };

  const handleRemoveSemester = (id) => {
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const handleResetCgpa = () => {
    setSemesters(createInitialSemesters());
    setCgpaResult(null);
    setCgpaMsg('');
  };

  const handleCalculateCgpa = () => {
    if (semesters.length === 0) {
      setCgpaResult(null);
      setCgpaMsg('Add at least one semester.');
      return;
    }

    let tp = 0;
    let tc = 0;

    for (let i = 0; i < semesters.length; i++) {
      const g = parseFloat(semesters[i].gpa);
      const cr = parseFloat(semesters[i].credits);

      if (isNaN(g) || g < 0 || g > 10) {
        setCgpaResult(null);
        setCgpaMsg(`Enter a GPA between 0 and 10 for semester ${i + 1}.`);
        return;
      }

      if (isNaN(cr) || cr <= 0) {
        setCgpaResult(null);
        setCgpaMsg(`Enter credits greater than 0 for semester ${i + 1}.`);
        return;
      }

      tp += g * cr;
      tc += cr;
    }

    if (!tc) {
      setCgpaResult(null);
      setCgpaMsg('Add at least one semester.');
      return;
    }

    const val = tp / tc;
    setCgpaMsg('');
    setCgpaResult({
      val: val.toFixed(2),
      pct: (val * 9.5).toFixed(1) + '%',
      cr: +tc.toFixed(2),
    });
  };

  return (
    <div className="wrap">
      <div className="top">
        <h1 id="title">GPA &amp; CGPA calculator</h1>
      </div>
      <p className="sub">
        Work out your semester GPA from course grades, or your overall CGPA from
        semester results. Everything runs in your browser.
      </p>

      <div className="tabs" role="tablist">
        <button
          className="tab"
          role="tab"
          id="t-gpa"
          aria-selected={activeTab === 'gpa'}
          aria-controls="p-gpa"
          onClick={() => setActiveTab('gpa')}
        >
          Semester GPA
        </button>
        <button
          className="tab"
          role="tab"
          id="t-cg"
          aria-selected={activeTab === 'cg'}
          aria-controls="p-cg"
          onClick={() => setActiveTab('cg')}
        >
          CGPA
        </button>
      </div>

      {/* Semester GPA Panel */}
      <section
        id="p-gpa"
        className="card gpa"
        role="tabpanel"
        aria-labelledby="t-gpa"
        hidden={activeTab !== 'gpa'}
      >
        <div className="head">
          <span>Course (optional)</span>
          <span>Credits</span>
          <span>Grade</span>
          <span></span>
        </div>

        <div id="g-rows">
          {courses.map((course, index) => (
            <div className="row" key={course.id}>
              <input
                type="text"
                placeholder="e.g. Maths"
                aria-label="Course name"
                value={course.name}
                onChange={(e) =>
                  handleCourseChange(course.id, 'name', e.target.value)
                }
              />
              <input
                type="number"
                min="0"
                step="0.5"
                aria-label="Credits"
                value={course.credits}
                onChange={(e) =>
                  handleCourseChange(course.id, 'credits', e.target.value)
                }
              />
              <select
                aria-label="Grade"
                value={course.grade}
                onChange={(e) =>
                  handleCourseChange(course.id, 'grade', Number(e.target.value))
                }
              >
                {GRADES.map((g) => (
                  <option key={g.label} value={g.points}>
                    {g.label} ({g.points})
                  </option>
                ))}
              </select>
              <button
                className="x"
                aria-label="Remove course"
                onClick={() => handleRemoveCourse(course.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn" id="g-add" onClick={handleAddCourse}>
            Add course
          </button>
          <button className="btn p" id="g-calc" onClick={handleCalculateGpa}>
            Calculate GPA
          </button>
          <button className="btn" id="g-reset" onClick={handleResetGpa}>
            Reset
          </button>
        </div>

        {gpaMsg && (
          <p className="msg" id="g-msg" role="alert">
            {gpaMsg}
          </p>
        )}

        {gpaResult && (
          <div className="res" id="g-res">
            <div>
              <span className="big" id="g-val">
                {gpaResult.val}
              </span>
              <small>Semester GPA</small>
            </div>
            <div>
              <span className="big" id="g-pct">
                {gpaResult.pct}
              </span>
              <small className="pl">Approx. percentage (× 9.5)</small>
            </div>
            <div>
              <span className="big" id="g-cr">
                {gpaResult.cr}
              </span>
              <small>Total credits</small>
            </div>
          </div>
        )}

        <p className="note">
          Grade scale: S = 10, A = 9, B = 8, C = 7, D = 6, E = 5, F = 0.
        </p>
      </section>

      {/* CGPA Panel */}
      <section
        id="p-cg"
        className="card cg"
        role="tabpanel"
        aria-labelledby="t-cg"
        hidden={activeTab !== 'cg'}
      >
        <div className="head">
          <span>Semester</span>
          <span>GPA</span>
          <span>Credits</span>
          <span></span>
        </div>

        <div id="c-rows">
          {semesters.map((sem, index) => (
            <div className="row" key={sem.id}>
              <input
                type="text"
                aria-label="Semester name"
                value={sem.name}
                onChange={(e) =>
                  handleSemesterChange(sem.id, 'name', e.target.value)
                }
              />
              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                placeholder="8.5"
                aria-label="Semester GPA"
                value={sem.gpa}
                onChange={(e) =>
                  handleSemesterChange(sem.id, 'gpa', e.target.value)
                }
              />
              <input
                type="number"
                min="0"
                step="0.5"
                aria-label="Credits"
                value={sem.credits}
                onChange={(e) =>
                  handleSemesterChange(sem.id, 'credits', e.target.value)
                }
              />
              <button
                className="x"
                aria-label="Remove semester"
                onClick={() => handleRemoveSemester(sem.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn" id="c-add" onClick={handleAddSemester}>
            Add semester
          </button>
          <button className="btn p" id="c-calc" onClick={handleCalculateCgpa}>
            Calculate CGPA
          </button>
          <button className="btn" id="c-reset" onClick={handleResetCgpa}>
            Reset
          </button>
        </div>

        {cgpaMsg && (
          <p className="msg" id="c-msg" role="alert">
            {cgpaMsg}
          </p>
        )}

        {cgpaResult && (
          <div className="res" id="c-res">
            <div>
              <span className="big" id="c-val">
                {cgpaResult.val}
              </span>
              <small>CGPA</small>
            </div>
            <div>
              <span className="big" id="c-pct">
                {cgpaResult.pct}
              </span>
              <small className="pl">Approx. percentage (× 9.5)</small>
            </div>
            <div>
              <span className="big" id="c-cr">
                {cgpaResult.cr}
              </span>
              <small>Total credits</small>
            </div>
          </div>
        )}

        <p className="note">
          CGPA = Σ(semester GPA × semester credits) ÷ Σ credits. If every
          semester has the same credits, leave them as they are for a simple
          average.
        </p>
      </section>
    </div>
  );
}

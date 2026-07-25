# EMRS Bhainsdehi — School Site

A small static site for EMRS Bhainsdehi with two tools and a home page linking to both.

## Structure

```
├── index.html                              # Homepage — links to the two tools below
├── index.css                               # Homepage styles
└── pages/
    ├── student-directory/
    │   ├── student-directory.html
    │   ├── student-directory.css
    │   └── student-directory.js
    └── timetable/
        ├── timetable.html
        ├── timetable.css
        └── timetable.js
```

Each page now lives in its own folder alongside its own CSS and JS file —
nothing is shared between the two tools.

## Notes

- `index.html` links to `index.css` in the same folder (previously an inline
  `<style>` block). It has no page-specific JS, so there's no `index.js`.
- `pages/timetable/timetable.html` links to `timetable.css` and
  `timetable.js` in the same folder (both were previously inline in the
  HTML).
- `pages/student-directory/student-directory.html` links to
  `student-directory.css` and `student-directory.js` in the same folder.
- Both tool pages have a "← Home" link back to `../../index.html`.
- Open `index.html` in a browser (or deploy the whole folder as-is) to view
  the site.

## Credit

Developed by **Bhupendra Pratap** (PGT CS, EMRS Bhainsdehi) —
bhupendrapratap999@gmail.com

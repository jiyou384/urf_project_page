# Academic Project Page

This is a project page scaffold based on
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template).

## Edit checklist

Most project content is configured in `static/js/project-config.js`.

Edit these fields there:

- `PROJECT_TITLE`
- `authors`
- `PROJECT_SHORT_DESCRIPTION`
- `PROJECT_LAB_OR_INSTITUTION`
- `PROJECT_VENUE`
- `PROJECT_YEAR`
- `PROJECT_PAGE_URL`
- `PROJECT_PAPER_URL`
- `PROJECT_CODE_URL`
- `PROJECT_ARXIV_URL`
- `PROJECT_DATA_URL`
- `PROJECT_YOUTUBE_ID`
- `PROJECT_ABSTRACT`

See `GUIDE_KO.md` for the Korean step-by-step guide.

Replace sample assets:

- `static/videos/result_video.mp4`
- `static/images/carousel1.jpg` through `static/images/carousel4.jpg`
- `static/pdfs/sample.pdf`
- `static/images/favicon.ico`

## Preview locally

From this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Push these files to a GitHub repository.
2. In the repository settings, enable GitHub Pages.
3. Set the source to the branch and folder containing `index.html`.

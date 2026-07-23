# 프로젝트 페이지 수정 가이드

이 프로젝트 페이지는 대부분의 텍스트와 링크를 한 파일에서 관리하도록 되어 있습니다.

핵심 파일:

- `static/js/project-config.js`: 논문 제목, 저자, 초록, 링크, BibTeX, 결과 이미지 설명을 수정하는 파일
- `index.html`: 페이지 구조를 수정하는 파일
- `static/`: 이미지, 영상, PDF 파일을 넣는 폴더

대부분의 경우 `index.html`을 여러 군데 고칠 필요 없이 `static/js/project-config.js`만 수정하면 됩니다.

## 1. 미리보기 실행

이 폴더에서 다음 명령을 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8000
```

## 2. 프로젝트 정보 한 번에 수정하기

`static/js/project-config.js`를 엽니다.

맨 위에 아래와 같은 설정 객체가 있습니다.

```js
window.PROJECT_CONFIG = {
  title: "PROJECT_TITLE",
  shortDescription: "PROJECT_SHORT_DESCRIPTION",
  keywords: "PROJECT_KEYWORDS, machine learning, artificial intelligence",
  institution: "PROJECT_LAB_OR_INSTITUTION",
  venue: "PROJECT_VENUE",
  year: "PROJECT_YEAR",
  pageUrl: "PROJECT_PAGE_URL",
  paperUrl: "PROJECT_PAPER_URL",
  codeUrl: "PROJECT_CODE_URL",
  arxivUrl: "PROJECT_ARXIV_URL",
  dataUrl: "PROJECT_DATA_URL",
  youtubeId: "PROJECT_YOUTUBE_ID"
};
```

여기 있는 값을 실제 프로젝트 정보로 바꾸면 페이지 전체에 반영됩니다.

예시:

```js
window.PROJECT_CONFIG = {
  title: "Learning Robust 3D Representations from Sparse Views",
  shortDescription: "A project page for a method that reconstructs robust 3D representations from sparse image observations.",
  keywords: "3D reconstruction, sparse views, neural rendering, computer vision",
  institution: "KAIST",
  venue: "CVPR",
  year: "2026",
  pageUrl: "https://username.github.io/project-name",
  paperUrl: "https://arxiv.org/pdf/2501.00000.pdf",
  codeUrl: "https://github.com/username/project-name",
  arxivUrl: "https://arxiv.org/abs/2501.00000",
  dataUrl: "https://huggingface.co/datasets/username/project-name",
  youtubeId: "abc123XYZ"
};
```

링크가 아직 없으면 빈 문자열로 둘 수 있습니다.

```js
paperUrl: "",
dataUrl: "",
```

빈 문자열인 버튼은 페이지에서 자동으로 숨겨집니다.

## 3. 저자 수정하기

`project-config.js`에서 `authors` 배열을 수정합니다.

```js
authors: [
  {
    name: "Author One",
    url: "AUTHOR_1_URL",
    equalContribution: true,
    citationName: "One, Author"
  },
  {
    name: "Author Two",
    url: "AUTHOR_2_URL",
    equalContribution: true,
    citationName: "Two, Author"
  },
  {
    name: "Author Three",
    url: "AUTHOR_3_URL",
    equalContribution: false,
    citationName: "Three, Author"
  }
],
```

각 항목의 의미:

- `name`: 페이지에 표시될 저자 이름
- `url`: 저자 이름을 눌렀을 때 이동할 링크
- `equalContribution`: 공동 1저자 표시 여부
- `citationName`: citation meta tag에 사용할 이름 형식

저자를 추가하려면 객체를 하나 더 추가합니다.

```js
{
  name: "New Author",
  url: "https://example.com",
  equalContribution: false,
  citationName: "Author, New"
}
```

공동 1저자가 없으면 모든 저자의 `equalContribution`을 `false`로 바꾸면 됩니다. 그러면 `* Equal contribution` 문구도 자동으로 사라집니다.

## 4. 초록 수정하기

`project-config.js`에서 아래 값을 바꿉니다.

```js
abstract: "PROJECT_ABSTRACT. Replace this paragraph with your paper or project abstract.",
```

예시:

```js
abstract: "We propose a new method for ... Our experiments show that ...",
```

줄바꿈이 필요한 긴 텍스트는 backtick을 쓰면 편합니다.

```js
abstract: `We propose a new method for sparse-view reconstruction.
Our method improves robustness under limited observations.
Experiments show consistent gains on multiple benchmarks.`,
```

## 5. 대표 문장 수정하기

대표 영상 아래에 보이는 짧은 설명은 `teaserCaption`을 바꿉니다.

```js
teaserCaption: "Our method reconstructs detailed 3D structure from only a few input views.",
```

## 6. 결과 이미지와 설명 수정하기

결과 섹션은 `results` 배열에서 관리합니다. Probex 페이지처럼 이미지와 설명문이 세로로 이어지는 구조입니다.

```js
results: [
  {
    image: "static/images/carousel1.jpg",
    alt: "Qualitative comparison on sparse-view reconstruction",
    title: "Qualitative Comparison",
    description: "Our method produces sharper geometry under sparse input views."
  },
  {
    image: "static/images/carousel2.jpg",
    alt: "Ablation result",
    title: "Ablation Study",
    description: "Ablation study showing the effect of each component."
  }
],
```

이미지 파일은 `static/images/` 폴더에 넣습니다.

기존 파일명을 그대로 쓰고 싶으면 아래 파일들을 교체합니다.

```text
static/images/carousel1.jpg
static/images/carousel2.jpg
static/images/carousel3.jpg
static/images/carousel4.jpg
```

다른 파일명을 쓰고 싶으면 `image` 값만 바꾸면 됩니다.

```js
image: "static/images/my_result.png",
```

## 7. 대표 영상 바꾸기

대표 영상 파일은 아래 경로를 사용합니다.

```text
static/videos/result_video.mp4
```

새 영상 파일을 같은 이름으로 교체하면 됩니다.

다른 파일명을 쓰고 싶으면 `index.html`에서 아래 부분만 수정합니다.

```html
<source src="static/videos/result_video.mp4" type="video/mp4">
```

권장 형식:

- `mp4`
- 너무 큰 파일은 피하기
- 자동 재생을 위해 소리가 없는 muted 영상 권장

## 8. YouTube 영상 바꾸기

`project-config.js`에서 `youtubeId`를 바꿉니다.

YouTube URL이 아래와 같다면:

```text
https://www.youtube.com/watch?v=abc123XYZ
```

`youtubeId`에는 `abc123XYZ`만 넣습니다.

```js
youtubeId: "abc123XYZ",
```

## 9. PDF 또는 포스터 바꾸기

현재 poster 섹션은 아래 PDF를 보여줍니다.

```text
static/pdfs/sample.pdf
```

내 논문 PDF나 포스터 PDF를 `sample.pdf` 이름으로 교체하면 됩니다.

다른 파일명을 쓰고 싶으면 `index.html`에서 아래 부분을 수정합니다.

```html
<iframe src="static/pdfs/sample.pdf" width="100%" height="550" title="Project poster"></iframe>
```

## 10. BibTeX 수정하기

`project-config.js`에서 `bibtex` 값을 수정합니다.

```js
bibtex: `@inproceedings{projectkeyPROJECT_YEAR,
  title={PROJECT_TITLE},
  author={Author One and Author Two and Author Three},
  booktitle={PROJECT_VENUE},
  year={PROJECT_YEAR},
  url={PROJECT_PAGE_URL}
}`
```

직접 실제 BibTeX를 넣어도 됩니다.

```js
bibtex: `@inproceedings{kim2026myproject,
  title={Learning Robust 3D Representations from Sparse Views},
  author={Kim, Jiyou and Lee, Example},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  year={2026}
}`
```

기본 설정에서는 `PROJECT_TITLE`, `PROJECT_VENUE`, `PROJECT_YEAR`, `PROJECT_PAGE_URL` 같은 값은 자동 치환됩니다.

## 11. SNS 미리보기 이미지 추가하기

SNS나 메신저에 링크를 공유했을 때 보이는 이미지는 아래 경로를 사용합니다.

```text
static/images/social_preview.png
```

권장 크기:

```text
1200 x 630 px
```

대표 결과 이미지를 복사해서 `social_preview.png`로 저장해도 됩니다.

## 12. `index.html`을 직접 수정해야 하는 경우

아래 작업은 `project-config.js`가 아니라 `index.html`을 수정해야 합니다.

- 섹션 순서 변경
- 새 섹션 추가
- YouTube 섹션 삭제
- Poster 섹션 삭제
- 대표 영상 파일 경로 자체 변경
- results 섹션의 HTML 구조 자체 변경

단순히 제목, 저자, 초록, 링크, result 이미지/설명, BibTeX만 바꾸는 경우에는 `project-config.js`만 수정하면 됩니다.

## 13. GitHub Pages로 배포하기

1. GitHub에 새 repository를 만듭니다.
2. 이 폴더의 파일들을 repository에 push합니다.
3. GitHub repository 페이지에서 `Settings`로 이동합니다.
4. 왼쪽 메뉴에서 `Pages`를 선택합니다.
5. `Build and deployment`에서 branch를 선택합니다.
6. `index.html`이 있는 branch와 folder를 선택합니다.
7. 저장 후 GitHub Pages URL이 생성될 때까지 기다립니다.

생성된 URL을 `project-config.js`의 `pageUrl`에 넣으면 공유 링크와 citation metadata가 더 정확해집니다.

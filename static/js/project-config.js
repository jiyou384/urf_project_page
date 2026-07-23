window.PROJECT_CONFIG = {
  title: "URF: A Unified Robot Control-Policy Framework for Stable Contact Aware Manipulation",
  shortDescription: "URF improves contact-aware manipulation by predicting both compliant actions and the controller behavior used to execute them.",
  keywords: "robot manipulation, contact-aware control, robot learning, impedance control, admittance control",
  institution: "Sungkyunkwan University",
  venue: "TBD",
  year: "",
  pageUrl: "https://jiyou384.github.io/urf_project_page/",
  paperUrl: "TBD",
  codeUrl: "TBD",
  arxivUrl: "TBD",
  dataUrl: "TBD",
  teaserCaption: "URF improves contact-aware manipulation by predicting both compliant actions and the controller behavior used to execute them.",
  abstract: "In this paper, we propose a Unified Robot Policy-Control Framework (URF), which connects compliant action prediction with unified impedance-admittance control. Given multimodal observations, URF predicts a virtual target, a stiffness matrix, and an impedance-admittance switch ratio. The switch ratio determines when the controller should behave more like admittance control for accurate motion tracking and when it should move toward impedance control for safer rigid contact. Because demonstration data do not provide ground-truth environment stiffness, we construct switch-ratio labels from measured contact forces and use them to supervise controller-mode prediction. Across box-flipping and line-pressing tasks, URF achieves higher task success rates while reducing failure modes observed with admittance-only execution, including rapid force buildup, large force oscillations, tool breakage, and robot safety stops. These results suggest that contact-aware policies benefit from predicting not only compliant actions but also the controller behavior used to execute them.",
  resultsIntro: "URF improves contact-aware manipulation by predicting both compliant actions and the controller behavior used to execute them. The following figures summarize the architecture and representative task results.",
  authors: [
    {
      name: "Jiyou Shin",
      url: "https://scholar.google.com/citations?hl=en&user=woYSjOMAAAAJ",
      equalContribution: false,
      citationName: "Shin, Jiyou"
    },
    {
      name: "Youngjin Seo",
      url: "https://scholar.google.com/citations?hl=en&user=RzqtgDQAAAAJ",
      equalContribution: false,
      citationName: "Seo, Youngjin"
    },
    {
      name: "Jaeseog Won",
      url: "",
      equalContribution: false,
      citationName: "Won, Jaeseog"
    },
    {
      name: "Sungwon Seo",
      url: "https://scholar.google.com/citations?hl=en&user=W-J4c-gAAAAJ",
      equalContribution: false,
      citationName: "Seo, Sungwon"
    },
    {
      name: "Hyunjun Kim",
      url: "",
      equalContribution: false,
      citationName: "Kim, Hyunjun"
    },
    {
      name: "Seokmin Yoon",
      url: "",
      equalContribution: false,
      citationName: "Yoon, Seokmin"
    },
    {
      name: "Tuan Luong",
      url: "https://scholar.google.com/citations?hl=en&user=ixhKMNQAAAAJ",
      equalContribution: false,
      citationName: "Luong, Tuan"
    },
    {
      name: "Hyungpil Moon",
      url: "https://scholar.google.com/citations?hl=en&user=kBU7Os0AAAAJ",
      equalContribution: false,
      citationName: "Moon, Hyungpil"
    }
  ],
  results: [
    {
      image: "static/images/network_architecture.png",
      alt: "Overview of the proposed URF network architecture and policy-control framework",
      title: "URF Network Architecture",
      description: "Overview of the proposed URF network architecture and policy-control framework."
    },
    {
      image: "static/images/main_result_v2.png",
      alt: "Box-flipping comparison between ACP and URF",
      title: "Box-Flipping Result",
      description: "Representative comparison between ACP and URF in the box-flipping task. (a) The virtual target, actual end-effector trajectories in the x-z plane and snapshots. Time progression is encoded by a dark-to-light trajectory colormap. Inferred horizons are visualized with matched colors, and arrows indicate the correspondence between each robot state and the virtual target commanded at that time. (b) The force norm of URF and ACP with the initial contact time aligned at t=0, using the same colormap as the end-effector trajectories to compare force increase and position at matched times.ACP fails due to end-tool breakage 0.86s after contact, whereas URF completes the task.(c) The stiffness and switch-ratio predicted by URF, aligned at the contact instant. URF lowers k_x and n before contact, and the crossing of k_x and k_z during lifting marks the shift from pushing into the box to supporting the upward flipping motion."
    },
    {
      image: "static/images/line_following_result.png",
      alt: "Line-following comparison between ACP and URF",
      title: "Line-Following Result",
      description: "Representative results for the line-pressing task.(a) Snapshots of the task execution, where the robot follows a line on a rigid surface while applying contact force.(b) The second row compares the force norm of URF and ACP.URF maintains a stable contact force above 5N after contact and completes the task, whereas ACP fails to establish stable contact at the beginning and later exhibits large force oscillations before triggering a robot safety stop.(c) The stiffness and switch-ratio profiles of URF.After contact, URF lowers the k_z and n to suppress force oscillations, then adjusts n during motion so that the tool can maintain contact while staying on the line."
    },
    {
      image: "static/images/line_following_traj.png",
      alt: "Line-following trajectory comparison",
      title: "Line-Following Result",
      description: "Trajectory comparison in the line-pressing task.Each plot shows ten evaluation trajectories for each method overlaid with the reference line.ACP fails during execution due to force oscillation.URF w/ n=0.5 follows the reference reasonably well, but some trajectories leave the valid region.URF w/ n=0 shows larger tracking error and higher trajectory variance due to impedance-only execution, with occasional large deviations from the reference.URF tracks the reference accurately and succeeds in all trials."
    }
  ],
  bibtex: `@inproceedings{projectkeyPROJECT_YEAR,
  title={PROJECT_TITLE},
  author={Author One and Author Two and Author Three},
  booktitle={PROJECT_VENUE},
  year={PROJECT_YEAR},
  url={PROJECT_PAGE_URL}
}`
};

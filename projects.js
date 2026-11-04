/* ==========================================
   PROJECT DATA

   When you add or edit projects later,
   this is the main section you will change.
========================================== */

// Optional per-project view overrides (missing fields use the main project data):
// views: {
//   list: { title: "Long title", secondaryCategory: "Poster", cover: { type: "image", src: "images/project/list.jpg" } },
//   grid: { title: "Short title", category: "Publication", secondaryCategory: "Magazine", cover: { type: "image", src: "images/project/grid.jpg" } }
// }
// Display categories do not change category filtering or project detail pages.
const projects = [


  {
    id: "comfortably-numb",
    views: { grid: { title: "Comfortably Numb", secondaryCategory: "Lyric video" } 
          
  
  },

    title: "Comfortably Numb Lyric Video",
    date: "2025",
    category: "Motion + Web",

    cover: {
        type: "video",
        src: "videos/comfortably-numb/cover.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },

    measurements: "1'55'', motion graphic animation, 2025",

    description: `This is a lyric video of Pink Floyd's song \"Comfortably Numb\". 
    Some words in the lyrics are replaced by important symbols in the animation. 
    For example, the word \"you\" is replaced by a dark butterfly and \"I\" 
    is replaced by a T-pin. \"I\" and the pin has a graphic relation, and \"I\"
    and \"you\" have a narrative relation; a contradiction. I was inspired by 
    butterfly taxidermy in RISD's Nature Lab. 
    
    \n I associate the process of a caterpillar 
    metamorphosing into a butterfly to a creative process. A caterpillar builds a cocoon 
    and crawls in while, inside the private room, its organs and biological structures 
    completely transforms. When it is ready it breaks the cozy cocoon to reveal itself 
    to the scary, vast nature. I used metamorphosis as a metaphor for a small thought or 
    a line in a sketchbook turning into a big project. A creative process almost always 
    comes with frustration. I associate the sense of stagnation and anxiety caused from 
    approaching deadlines with the displayed butterflies and caterpillars in the taxidermy box.`,


    page: {
  

  hero: {
    type: "image",
    src: "images/comfortably-numb/hero.jpg",
    fit: "cover",
    loop: true,
  },
  
  blocks: [

  {
    type: "big",
    margin: "1-column",
    media: {
      type: "video",
      src: "videos/comfortably-numb/leading-to-explosion.mp4",
      preload: "auto",
      autoplayOnView: true,
      muted: false,
      controls: true,
      loop: true,
      fit: "contain",
      poster: "images/comfortably-numb/poster.jpg",
      caption: "Preview"
    }
  },
  
  {
  type: "big",
  margin: "1-column",
  media: {
    type: "video",
    src: "videos/comfortably-numb/nose-blood.mp4",
    controls: false,
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    fit: "contain"
  }
},
{
  type: "big",
  margin: "1-column",
  media: {
    type: "video",
    src: "videos/comfortably-numb/cover.mp4",
    controls: false,
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    fit: "contain"
  }
},
{
  type: "big",
  margin: "1-column",
  media: {
    type: "video",
    src: "videos/comfortably-numb/horizon.mp4",
    controls: false,
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    fit: "contain"
  }
},

{
    type: "big",
    margin: "1-column",
    media: {
      type: "video",
      src: "videos/comfortably-numb/full-vid.mp4",
      controls: true,
      loop: true,
      fit: "contain",
      poster: "images/comfortably-numb/poster.jpg",
      caption: "Full video of Comfortably lyric video"
    }
  },
    
  ]
}},

  {
    id: "risd-sign-system",
    views: {
     grid: { 
      cover: { type: "image", src: "images/risd-sign-system/grid-cover.jpg" } },
           },

    title: "RISD Sign System",
    date: "2026",
    category: "Identity",

    cover: { type: "image", src: "images/risd-sign-system/cover.jpg" },

    measurements: `13" x 9", 9 pages, accordion book, 2026`,

    description:
      `This identity system was added to various directories, 
      maps and other graphics. I was inspired by the colors and 
      overlay aesthetics of masking tape, one of many art supplies 
      RISD students use the most.`,

page: {
  

  hero: {
    type: "image",
    src: "images/risd-sign-system/hero.jpg",
    fit: "cover"
  },
  
  blocks: [

    {
          type: "equal-grid", margin: "full-bleed", columns: 1, gutter: 0,
          items: [
            { type: "image",
              src: "images/risd-sign-system/door-map.jpg",
              alt: "risd sign system",
              fit: "contain" },

            { type: "image",
              src: "images/risd-sign-system/direction.jpg",
              alt: "risd sign system",
              fit: "contain" },

            { type: "image",
              src: "images/risd-sign-system/elevator.jpg",
              alt: "risd sign system",
              fit: "contain" },
            ]
        },
    
  ]
}

    
  },
  

  {
    id: "bluetooth",
    views: {
     grid: { 
      category: "Publication", 
      secondaryCategory: "Accordion Book", 
      cover: { type: "image", src: "images/bluetooth/grid-cover.jpg" } },
           },

    title: "Bluetooth LE Principles",
    date: "2026",
    category: "Infographics",

    cover: { type: "image", src: "images/bluetooth/cover.jpg" },

    measurements: `13" x 9", 9 pages, accordion book, 2026`,

    description:
      `This accordion book is a data visualization of the principles 
      of Bluetooth LE (Low Energy). I did in-depth research on what 
      exactly happens in both the computer and the headphones when music 
      travels from both devices. The research itself, where I taught myself 
      how Bluetooth operates, took the longest time in the project timeline. 
      On the left side of the pages, the book explains what literally happens with 
      the actual protocol stack on both devices. As the reader proceeds to the right, 
      the explanation goes more figurative, metaphorical and detailed.`,

page: {
  

  hero: {
    type: "image",
    src: "images/bluetooth/hero.jpg",
    fit: "contain"
  },

  blocks: [
    {
          type: "equal-grid", margin: "1-column", columns: 1, gutter: 0,
          items: [
            { type: "image",
              src: "images/bluetooth/pages-webp/cover.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

            { type: "image",
              src: "images/bluetooth/pages-webp/stack.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

            { type: "image",
              src: "images/bluetooth/pages-webp/1.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/2.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/3.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/4.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/5.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/6.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },

              { type: "image",
              src: "images/bluetooth/pages-webp/7.webp",
              alt: "Bluetooth LE Principles",
              fit: "contain" },
            ]
        },
  ]
} },

   {
    id: "mind-uploading-magazine",
    views: { 
      grid: { 
        title: "Mind Uploading", 
        category: "Publication", 
        secondaryCategory: "Magazine",
        cover: { type: "image", src: "images/mind-uploading-magazine/grid-cover.jpg" }} },

    title: "Mind Uploading Magazine",
    date: "2025",
    category: "Editorial",

    cover: { type: "image", src: "images/mind-uploading-magazine/cover.jpg" },

    measurements: "9\" x 12\", Magazine, 2025",

    description: `I made a magazine based on educational Youtuber Kurzgesagt's video, 
    "Can You Upload Your Mind And Live Forever?" There are fold out pages at the end 
    of each chapter, depicting the vast scale of knowledge and the universe. The magazine 
    making process was simple. I watched Kurzgesact's video, digested the contents, 
    and made pages based on the visual language I wanted the magazine to have.`,

    page: {
      
      hero: {
        type: "image",
        src: "images/mind-uploading-magazine/hero.jpg",
        alt: "mind uploading magazine",
        fit: "contain"
},
      blocks: [
        {
          type: "equal-grid",
          margin: "0-column",
          columns: 3,
          mobileColumns: 2,
          gutter: 5,
          caption: "Spreads",

          items: [
            2, 3, 5, 6,
            7, 8, 9, 10, 11,
            12, 13, 14,
          ].map(n => ({
            type: "image",
            src: `images/mind-uploading-magazine/spreads/${n}.jpg`,
            alt: `Mind Uploading spread ${n}`,
            fit: "contain"
          }))
        },
        {
          type: "equal-grid", margin: "full-bleed", columns: 1, gutter: 0,
          caption: "Size comparison", 
          items: [
            { type: "image",
              src: "images/mind-uploading-magazine/covers-spread.jpg",
              alt: "mind uploading magazine",
              fit: "contain" },

            { type: "image",
              src: "images/mind-uploading-magazine/2-3.jpg",
              alt: "mind uploading magazine",
              fit: "contain" },

            { type: "image",
              src: "images/mind-uploading-magazine/10-11.jpg",
              alt: "mind uploading magazine",
              fit: "contain" },

            { type: "image",
              src: "images/mind-uploading-magazine/12-13.jpg",
              alt: "Mind Uploading magazine",
              fit: "contain" },

              { type: "image",
              src: "images/mind-uploading-magazine/maze-spread.jpg",
              alt: "Mind Uploading magazine",
              fit: "contain" },

              { type: "image",
              src: "images/mind-uploading-magazine/size-comparison.jpg",
              alt: "Mind Uploading magazine",
              fit: "contain" },
          ]
        },

      ]
    },
  },

  {
    id: "safet",
    title: "Safe-T: Sequential, Advised, Familiarized Exposure Therapy",
    date: "2026",
    category: "Identity",
    cover: { type: "video", src: "videos/safet/cover.mp4" },

    views: { 
      grid: { 
        title: "Safe-T", secondaryCategory: "Campaign, Motion, Identity",
        cover: { type: "video", src: "videos/safet/grid-cover.mp4" }
      } 
    },
      cover: {
        type: "video",
        src: "videos/safet/cover.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },
    
      title: "Safe-T: Sequential, Advised, Familiarized Exposure Therapy",
    date: "2026",
    category: "Identity",

    measurements: "Campaign, Identity, Motion, 2026",

    description: `A campaign for Project REACH, a research initiative led by Dr. Hannah Frank, 
    an Assistant Professor of the Department of Psychiatry and Human Behavior at Brown University. 
    REACH aims to increase access to exposure therapy for people with and parents of children who 
    have anxiety, OCD, and other related disorders. Sate-T was a group project; the teammates were
    Yujung Jang, Rachel Chen, and Koji Hellman. I developed the visual identity and brand guidelines 
    for Safe-T. The identity system was then applied across campaign materials, including posters 
    and worksheets designed by Rachel and Koji.
`,

    page: {
      
      hero: {
        type: "image",
        src: "images/safet/hero.jpg",
        alt: "Safe-T campaign overview",
        fit: "contain"
},
      blocks: [
        {
          caption: "Explainer poster by Koji Hellman",
          type: "collage", margin: "1-column", columns: 10, gutter: 42,
          rows: [[
            { span: 6, media: { type: "image", src: "images/safet/poster.jpg", 
              alt: "Safe-T campaign poster explaining the therapy campaign, identity and materials", 
              width: 7200, height: 10800 } },
            { span: 4, gutter: 28, stack: [
              { type: "image",
              src: "images/safet/therapist-talk.png",
              alt: "Safe-T campaign",
              fit: "contain" },
              { type: "image",
              src: "images/safet/bed-extension.png",
              alt: "Safe-T campaign",
              fit: "contain" }
            ] }
          ]]
        },

        {
          type: "equal-grid", margin: "1-column", columns: 3, gutter: 20,
          aspectRatio: "348 / 458",
          caption: "Worksheets by Koji Hellman",
          items: [
            { type: "image",
              src: "images/safet/explainersheet.jpg",
              alt: "Safe-T campaign",
              fit: "contain" },

            { type: "image",
              src: "images/safet/ws-fear-hierarchy.jpg",
              alt: "Safe-T campaign",
              fit: "contain" },

            { type: "image",
              src: "images/safet/ws-gradedexposure.jpg",
              alt: "Safe-T campaign",
              fit: "contain" },
          ]
        },

        { type: "big", margin: "1-column",
          caption: "Animation directed and created by Rachel Chen,\nillustrations by Koji Hellman", 
          media: { type: "video",
              preload: "auto",
              autoplayOnView: true,
              src: "videos/safet/explainer-video.mp4",
              alt: "Safe-T campaign",
              poster: "images/safet/explainer-video-poster.jpg",
              fit: "contain" } },

        {
          type: "equal-grid",
          margin: "0-column",
          columns: 5,
          mobileColumns: 2,
          gutter: 0,
          aspectRatio: "264 / 204",
          caption: "Brand guideline by Yujung Jang",
          items: [
            1, 4, 
            6, 7, 8, 
            9, 10, 11, 
            12, 13, 14, 
            15, 16, 17, 18
          ].map(n => ({
            type: "image",
            src: `images/safet/style-guide-jpg/${n}.jpg`,
            alt: `Safe-T style guide ${n}`,
            fit: "contain"
          }))
        },
          

        { type: "big", margin: "1-column",
          caption: "Logo by Yujung Jang and Rachel Chen", 
          media: { type: "video",
        src: "videos/safet/logo-animation.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false } }
      ]
    },
    


    
  },

  {
    id: "thisplace-alot",

    views: {
     grid: { 
      category: "Motion + Web", 
      secondaryCategory: "Data Visualization", 
      cover: { type: "image", src: "images/thisplace-alot/grid-cover.webp" } },
           },

    title: "This Place Is a Lot",
    date: "2025",
    category: "Motion + Web",

    cover: {
        type: "video",
        src: "videos/thisplace-alot/loop.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },

    measurements: "1'55'', motion graphic animation, 2025",

    description: `This Place Is A Lot looks at the irony of non-vehicular interactions that 
    occur in a space designed for vehicles. We want to view the Metropark parking 
    lot as a site for more than what it is intended for. We observed traffic in ways 
    unrelated to cars: animals, pedestrians, flora, and light patterns. It was 
    interesting to view an unextraordinary space like a parking lot as one filled 
    with much more life than initially observed.

    \n This display is a mockup of a web experience intended to guide the viewer through 
    an abstracted space, "the place" later understood as a parking lot. On this journey, 
    the user encounters a range of residents and passersby of the place, prompted to click 
    on each and obtain data on their whereabouts, personalities, and movement.`,

    page: {
      hero: {
        type: "image",
        src: "images/thisplace-alot/hero.jpg",
        alt: "This Place Is a Lot hero",
        fit: "contain"
},

    blocks: [

    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "left",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/animation.gif",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },

    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "center",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/2.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },

    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "right",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/3.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },

    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "center",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/4.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },

      {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "left",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/5.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "center",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/6.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "right",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/7.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "center",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/8.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "left",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/9.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "center",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/10.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },
    {
      type: "midsize",
      span: 8,
      gapAfter: 14,
      align: "right",
      margin: "0-column",
      media: {
        type: "image",
        src: "images/thisplace-alot/11.jpg",
        alt: "This Place Is a Lot",
        fit: "contain",
      }
    },

    {
          type: "equal-grid", margin: "2 columns", columns: 2, gutter: 14,
          items: [
            { type: "image",
              src: "images/thisplace-alot/strip-bright.jpg",
              alt: "This Place Is a Lot",
              fit: "contain" },

            { type: "image",
              src: "images/thisplace-alot/strip-dark.jpg",
              alt: "This Place Is a Lot",
              fit: "contain" },
            ]
        },

        
    
    
    
      ]
    }
  },


  {
    id: "are-we-there-yet",
    views: {
      grid: {
        title: "Are We There Yet?",
        secondaryCategory: "Poster",
        cover: { type: "image", src: "images/are-we-there-yet/grid-cover.jpg" }
      }
    },

    title: "Are We There Yet? My Bag is Heavy...",
    date: "2025",
    category: "Infographics",

    cover: { type: "image", src: "images/are-we-there-yet/cover.jpg" },

    measurements: "24\" x 36\", Poster, 2026",

    description: `This poster is a data visualization of three trips, 
    each from 15 Westminster St Providence to three different locations. 
    I drew the assets with colored pencil, edited them on Photoshop, and 
    imported them into Indesign to add captions, arrows, and other graphics.`,

    page: {
  

  hero: {
    type: "image",
    src: "images/are-we-there-yet/hero.png",
    fit: "contain"
  },

  blocks: [
    {
      type: "big",
      margin: "1-column",
      media: {
        type: "image",
        src: "images/are-we-there-yet/poster.jpg",
        alt: "Are we there yet poster",
        fit: "contain"
      }
    },
    {
      type: "big",
      margin: "1-column",
      media: {
        type: "image",
        src: "images/are-we-there-yet/bags.png",
        alt: "Are we there yet bags",
        fit: "contain",
        caption: "Bags drawings",
      }
    },
        {
          type: "equal-grid",
          margin: "1-column",
          columns: 5,
          mobileColumns: 2,
          gutter: 0,
          caption: "Object drawings",

          items: [
            1, 2, 3, 4, 5
          ].map(n => ({
            type: "image",
            src: `images/are-we-there-yet/${n}.jpg`,
            alt: `Are we there yet ${n}`,
          }))
        }
  ]
} 
  
  },

  {
    id: "opening",

    title: "Opening",
    date: "2025",
    category: "...what else?",
    secondaryCategory: "Publication, Installation",

    cover: { type: "image", src: "images/opening/cover.jpg" },

    measurements: "6\" x 9\",  Campaign, package and pamphlet design, 2025",

    description: `Opening is a campaign I did promoting the fashion designer Terrence Zhou.
My color and surface course assigned me one contemporary fashion designer and make a 
'book' to advertise the fashion show. The term 'book' here was more conceptual and flexible.`,

    hero: { type: "image", src: "images/opening/hero.jpg" },

    gallery: [
      { type: "image", src: "images/opening/opened-both.jpg" },
      { type: "image", src: "images/opening/1.jpg" },
      { type: "image", src: "images/opening/2.jpg" },
      { type: "image", src: "images/opening/cover.jpg" },
      { type: "image", src: "images/opening/board-3.jpg" },
      { type: "image", src: "images/opening/white-box-w-pawns.jpg" },
      { type: "image", src: "images/opening/pawns.jpg" },
      { type: "image", src: "images/opening/pawns-closeup.jpg" },
      { type: "image", src: "images/opening/white-pawns.jpg" },
      { type: "image", src: "images/opening/black-pawns.jpg" },
      { type: "image", src: "images/opening/pawns.jpg" },
      { type: "image", src: "images/opening/aboutthe-colors.jpg" },
      { type: "image", src: "images/opening/queens.jpg" },
    ]
  },

  {
    id: "handshake",
    title: "Handshake",
    date: "2025",
    category: "Motion + Web",

    views: { 
      grid: { 
        title: "Handshake", 
        cover: {
        type: "video",
        src: "videos/handshake/10-anticipation.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },
      } 
    },
      cover: {
        type: "video",
        src: "videos/handshake/10-anticipation.mp4",

        autoplay: true,
        loop: true,
        muted: true,
        controls: false
      },

    measurements: "2'56\", Motion graphic animation, 2025",

    description: `A vector-based animation study I did to visualize the song from 
    Gabriel Drozdov. Hands are as expressive as faces so it can depict meanings and messages. 
    Figuring out how I want to depict the hands to represent the music was intuitive. 
    I drew the hands based on how I would dance along the music and vectorized the shapes.`,

    page: {
      
      hero: {
        type: "video",
        src: "videos/handshake/strips.mp4",
        alt: "Handshake overview",
        fit: "cover",
        autoplay: true,
              loop: true,
              muted: true,
              controls: false },

      blocks: [
        
          {type: "equal-grid", margin: "1-column", columns: 3, gutter: 0,
          items: [
            { type: "video",
              src: "videos/handshake/1-pulse.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },

            { type: "video",
              src: "videos/handshake/3-emphasis.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },

            { type: "video",
              src: "videos/handshake/4-syncopation.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },
              
              { type: "video",
              src: "videos/handshake/9-melody.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },

              { type: "video",
              src: "videos/handshake/10-anticipation.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },

              { type: "video",
              src: "videos/handshake/11-atmosphere.mp4",
              autoplay: true,
              loop: true,
              muted: true,
              controls: false },
          ]
        },
        

        { type: "midsize", span: 6, margin: "1-column", 
          media: { type: "video",
              src: "videos/handshake/everything-compressed.mp4",
              alt: "handshake all animation",
              poster: "images/handshake/poster.jpg",
              fit: "contain" }  },
    ]},
    


    
  },

  

  
  {
    id: "dunbar",

    title: "Dunbar",
    date: "2024",
    category: "...what else?",
    secondaryCategory: "Poster",

    cover: { type: "image", src: "images/dunbar/cover.jpg" },

    measurements: "24\" x 36\",  Poster, 2024",

    description: `This poster promotes the typeset 'Dunbar', created by CJ Dunn.
This is the website to the designer's page, introducing the font and explaining the process.`,

    hero: { type: "image", src: "images/dunbar/hero.jpg" },

    gallery: [
      { type: "image", src: "images/dunbar/1.jpg" },
      { type: "image", src: "images/dunbar/2.jpg" },
    ]
  },

  {
    id: "alefbeats",

    title: "Alef Beats",
    date: "2025",
    category: "Identity",

    views: {
     grid: { 
      category: "Identity", 
      secondaryCategory: "Logo and Branding", 
      cover: { type: "image", src: "images/alefbeats/grid-cover.webp" } },
           },

    cover: { type: "image", src: "images/alefbeats/cover.webp" },

    measurements: "6\" x 9\",  Logo and identity design, 2025",

    description: `I designed the logo of the acapella group, The Alef Beats.
    The logo was inserted on the front and the back of the group's sweatshirt.
    The first source of inspiration of this identity design was the Hebrew alphabets 
    "Alef" and "Bet". I combined those two letters with the English alphabets "A" and "B". 
    This was to visualize the cultural identity of the group, emphasizing Hebrew songs but 
    also embracing POP songs with English lyrics. The Alef Beats is a Jewish a capella group, 
    but joining is not limited to Jewish people only. 
    
    \nThe second source of inspiration was the sound of the music, or more specifically, 
    our voices. Both the logomark (the main logo, the symbolic icon) and the logotype 
    (letters "the Alef Beats" as a logo) have dynamic and flexible lines. Those lines 
    symbolize the dynamic sounds the group makes when they sing. Voices can be dark, bright, 
    quiet, loud, and so much more. Singing, or music in general, requires musicians to 
    skillfully maneuver the instrument to produce those different tones, notes, beats and 
    volumes. Singing as a group is a challenging yet rewarding art because individual 
    voices are blended into the big flow of music as a whole.
    I had a lot of fun incorporating my philosophy of music and the group into the aesthetics 
    of the logo.`,

    page: {
    hero: { type: "image", src: "images/alefbeats/hero.webp" },

    blocks: [

      {
          type: "equal-grid", margin: "1-column", columns: 2, gutter: 0,
          items: [
            { type: "image",
              src: "images/alefbeats/logomark-wt.webp",
              alt: "alef beats",
              fit: "contain" },

            { type: "image",
              src: "images/alefbeats/logomark-blue.webp",
              alt: "alef beats",
              fit: "contain" },

            { type: "image",
              src: "images/alefbeats/logotype-blue.webp",
              alt: "alef beats",
              fit: "contain" },

              { type: "image",
              src: "images/alefbeats/logotype-wt.webp",
              alt: "alef beats",
              fit: "contain" },
            ]
        },
      { type: "big", margin: "1-column", media: { type: "image", src: "images/alefbeats/jason.jpg", alt: "Alef Beats sweatshirt" } },
      { type: "big", margin: "1-column", media: { type: "image", src: "images/alefbeats/threeppl.jpg", alt: "Alef Beats group members" } },
      
    ]
    }
  },

  {
    id: "makeup",

    title: "Makeup Collection",
    date: "2025",
    category: "...what else?",
    secondaryCategory: "Poster",

    cover: { type: "image", src: "images/makeup/cover.jpg" },

    measurements: "24\" x 36\", Poster series, 2025",

    description: `Makeup collection is a series of poster that promotes different aesthetics 
    and functions of makeup. The two sides of a face are connected, creating a large facial map. 
I started with a sketch of a face divided by two windows. I wanted the interaction between two 
posters feel personal. I considered drawing all faces I collected to unify the shape and tone, 
but eventually I decided that the colors and even expressions of the creative makeup looks give 
life to the posters. I did a physical collage to feel the dimensions of the final posters. 
Finding on the title font was a challenge because I wanted the title to capture the essence of 
the word 'makeup'. I did an illustrative lettering to express the essence of makeup.`,

    hero: { type: "image", src: "images/makeup/hero.jpg" },

    gallery: [
      { type: "image", src: "images/makeup/1.jpg" },
      { type: "image", src: "images/makeup/lettering.jpg" },
      { type: "image", src: "images/makeup/2.jpg" },
      
    ]
  },

  

];


/* ==========================================
   HOMEPAGE PROJECT CARDS

   You should NOT need to edit this section
   when adding new projects.
========================================== */

const projectsContainer = document.querySelector(".projects");


if (projectsContainer) {
  const home = window.PortfolioHome;
  home.sync();
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  function renderProjects(projectList) {


  projectsContainer.innerHTML = projectList.length ? projectList
    .map((project, index) => {
      const view = document.body.dataset.view === 'grid' ? 'grid' : 'list';
      const display = { ...project, ...project.views?.[view] };
      const title = escapeHTML(display.title);
      const cover = { ...project.cover, ...project.views?.[view]?.cover };
      const coverSrc = escapeHTML(cover.src);

      const guide = index === 0
        ? `
          <div class="project-guide" aria-hidden="true">
            <span class="project-guide-horizontal arrow-right"></span>
            <span class="project-guide-vertical arrow-down"></span>
          </div>
        `
        : "";


      const projectLink =
        `project.html?id=${project.id}`;


      return `
        <article class="project">

          <div class="project-image-wrap">

            ${guide}

            <a
              href="${projectLink}"
              class="project-image"
              aria-label="View ${title}"
            >

              ${
                cover.type === "video"

                  ? `
                    <video
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="metadata"
                    >
                      <source
                        src="${coverSrc}"
                        type="video/mp4"
                      >
                    </video>
                  `

                  : `
                    <img
                      src="${coverSrc}"
                      alt="${title}"
                      loading="lazy"
                      decoding="async"
                    >
                  `
              }

            </a>

          </div>


          <div class="project-info">

            <h2 class="project-title">
              <a href="${projectLink}">
                ${title}
              </a>
            </h2>


            <div class="project-meta">
              <p>${escapeHTML(display.date)}</p>
              <p>${escapeHTML(display.category)}${display.secondaryCategory ? `<span class="project-secondary-category">${escapeHTML(display.secondaryCategory)}</span>` : ""}</p>
            </div>

          </div>

        </article>
      `;

    })
    .join("") : `<p class="projects-empty" role="status">Projects in this category are coming soon.</p>`;
}

function renderSelection() {
  const category = home.state.category;
  const filtered = category === 'all' ? projects : projects.filter(project =>
    category === 'other'
      ? !['Motion + Web', 'Editorial', 'Identity', 'Infographics'].includes(project.category)
      : project.category === category
  );
  renderProjects(filtered);
}

document.addEventListener('portfolio:homechange', renderSelection);
renderSelection();
home.restoreScroll(projectsContainer);
}

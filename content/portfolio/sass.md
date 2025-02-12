---
title: "SASS"
description: "Descrizione per la pagina skills => SASS"
logo: "/img/logos/sass.svg"
navigation:
  title: "SASS"
  icon: "/img/logos/sass.svg"
experience: 10
language: "scss"
features:
  - intro: "I am an experienced developer with a deep understanding of SASS (Syntactically Awesome Style Sheets). My expertise spans a range of advanced techniques that enhance the efficiency and maintainability of stylesheets. Below, I highlight five key areas where my proficiency in SASS has made a significant impact on my development work."
  - name: "Advanced Functions"
    description: "I like SASS very much; I think it has lots of wonderful possibilities, if you scratch the surface a bit. Mastering funtions not only allows you to keep your code DRY and well-organized but it gives big room for creativity and, why not... fun"
    code: |
      @each $key, $value in $icons {
        $delimiterPos: string.index($key, '-');
        $trimmedKey: string.slice($key, $delimiterPos +1);

        span.inlineIcon--#{$trimmedKey} {
          font-weight: normal !important;
          `...`

          &::before {
            `...`
            mask-image: $value;
            mask-size: 100%;
            mask-repeat: no-repeat;
            mask-position: center;
            background-color: $accentColor;
          }
        }
      }
    ##image: "/img/snippets/sass-functions.jpg"
  - name: "Advanced Mixins"
    description: "I leverage SASS mixins to simplify and automate responsive design. In the code example my mixin for generating responsive column offsets, allows for automatic creation of classes for various breakpoints. This approach significantly reduces repetitive code and makes the layout system adaptable to different devices."
    code: |
      @mixin flex-column(
        $span: 1, 
        $columns: 12, 
        $gap: 0, 
        $itemsPerRow: $columns / $span) {
        $percentage: math.div(100%, $columns);
        $totalGapsPerRow: $itemsPerRow - 1;
        $gapCorrection: $gap * math.div(
                            $totalGapsPerRow, 
                            $itemsPerRow);
        $width: calc((#{$percentage * $span}) - #{$gapCorrection});

        & {
          flex: 0 0 #{$width};
          max-width: #{$width};
        }
      }
    ##image: "/img/snippets/sass-mixins.jpg"
  - name: "Theme Management"
    description: "I leverage SASS variables to manage colors, fonts, and spacing, making it easy to adjust themes and maintain consistency across a project. My experience includes setting up dark and light themes for applications using variables, allowing for quick adjustments with minimal effort."
    code: |
      $themes: (
        light: (
          primaryColor: darkcyan, secondaryColor: darkred,
        ),
        dark: (
          primaryColor: cyan, secondaryColor: salmon,
        ),
      );

      @mixin theme() {
        $theme-index: string.index(#{&}, "-");
        $theme-name: string.slice(#{&},2, $theme-index - 1);
        $theme: map.get($themes, $theme-name);

        .button {
          background: map.get($theme, primaryColor);
          color: map.get($theme, secondaryColor);
        }
      }

      .light-theme { @include theme() }
      .dark-theme { @include theme() }

    ##image: "/img/snippets/sass-themeManagement.jpg"
  - name: "SVG Animations"
    description: "Surely there are some very good libraries around for animating SVGs but if you want to hand-craft them for a better control and less headaches with your existing codebase, SASS is surely a must for handling interval-staggering and color morph without bloating and cluttering your code"
    code: |
      `...``
      @each $path in $paths {
        $index: list.index($paths, $path);
        $stroke-delay: $strokeStagger * ($index - 1);
        $fill-delay: 0.8s + ($fillStagger * ($index - 1));

        svg .alessandro-#{$index} {
          stroke-dashoffset: $path;
          stroke-dasharray: $path;
          transition-property: stroke-dashoffset, fill;
          transition-duration: 1s, 0.7s;
          transition-timing-function: 
            cubic-bezier(0.47, 0, 0.745, 0.715), 
            cubic-bezier(0.47, 0, 0.745, 0.715);
          transition-delay: #{$stroke-delay}, #{$fill-delay};
        }

        svg.active .alessandro-#{$index} {
          stroke-dashoffset: 0;
          fill: $lightGrey;
        }
      }
    ##image: "/img/snippets/sass-svgAnimations.jpg"
  - name: "Responsive Design"
    description: "SASS is very handy when it comes to generate fully responsive classes. It seamlessly adapts layout rules at predefined breakpoints, ensuring a consistent, maintainable, and scalable design framework"
    code: |
      `...`

      @each $breakpoint, $min-width in $breakpoints {
        @if $breakpoint == 'mobile' {
          @media (max-width: #{$min-width - 1px}) {
            .#{$breakpoint}-item-#{$span}-#{$columns} {
              margin: auto;
              @include flex-column(
                $span, $columns, $gap, $items-per-row
              );
            }
          }
        } @else {
            @media (min-width: #{$min-width}) {
              .#{$breakpoint}-item-#{$span}-#{$columns} {
                margin: auto;
                @include flex-column(
                  $span, $columns, $gap, $items-per-row
                );
              }
            }
        }
      }
    ##image: "/img/snippets/sass-responsiveDesign.jpg"
---

---
title: "You Can Use SVG Filters in CSS - Here's How"
slug: "svg-filter"
description: "This is a walkthrough of using SVG filters to create blob-like gradient effects with blurred, merging shapes. We'll build it step by step, starting from a basic page."
date: 2025-11-01T15:57:27-03:00
draft: false
toc: false
images: ["/images/svg-filter/svg-filter.gif"]
tags:
  - svg
  - svg-filters
  - css
  - web-graphics
  - visual-effects
  - gooey-effect
  - gradients
---


{{< video src="video/svg-filter.mp4" autoplay="true" muted="true" loop="true" width="100%" >}}

Notice how those blobs smoothly merge and separate? That's SVG filters at work.

You may already know you can include SVGs in a web page. But did you know about SVG filters? Filters are effects that can be applied to SVG elements, like blurs, shadows, or color adjustments. And it turns out you can also apply them to HTML elements with CSS.

Let me show you an example. We'll start with a simple HTML page containing a container div for objects with gradients. Inside this I'll put two divs that are circles with gradients, all in a style tag.

## Basic Setup

**HTML (index.html):**

For simplicity, I'm including the CSS in a `<style>` tag, but you could also use an external stylesheet.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body {
            background: linear-gradient(
                40deg, rgb(108, 0, 162), rgb(0, 17, 82)
            );
            margin: 0;
            height: 100vh;
        }
        .gradient-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .circle {
            width: 400px;
            height: 400px;
            margin: -30%;
            border-radius: 70%;
        }
        .g1 {
            background: radial-gradient(
                circle at center,
                rgba(52, 190, 203, 0.8) 0,
                rgba(180, 180, 50, 0) 50%
            ) no-repeat;
        }
        .g2 {
            background: radial-gradient(
                circle at center,
                rgba(172, 159, 38, 0.8) 0,
                rgba(16, 202, 248, 0) 50%
            ) no-repeat;
        }
    </style>
</head>
<body>
    <div class="gradient-container">
        <div class="circle g1"></div>
        <div class="circle g2"></div>
    </div>
</body>
</html>
```

This is the CSS I have. `g1` and `g2` define two background gradient colors. `circle` defines the size and shape with the border radius. For the gradient container, I make it fit the screen and define the disposition of the elements inside of it. Finally, the body just has the main background gradient.

This produces two static, overlapping colored blobs on the background.

Now let's add the magic that makes them blend together.

## Add the SVG Filter

Now, inside the body, I will create a new SVG element. I will make sure this element is not visible with display none.

Add an `<svg>` before the container div:
```html
<svg style="display: none;">
</svg>
```

Now inside the SVG I can create my filter element with id svgfilter:

```html
<svg style="display: none;">
    <filter id="svgfilter">
    </filter>
</svg>
```

Now let's add the filter effects. Inside the filter, we can define the filter effect functions we want. For example, this Gaussian blur. (`<feGaussianBlur>`) where `fe` stands for `filter effect`, and I can track the result of a filter applied with the result attribute. In this case, the ID of the result will be blur. I can then use this ID as an entry for another filter.

```html
<svg style="display: none;">
    <filter id="svgfilter">
        <!-- Apply blur effect and store result -->
        <feGaussianBlur stdDeviation="10" result="blur" />
    </filter>
</svg>
```

I want these two circles to blend as they get closer, kind of like a melt or gooey effect. For that, I can use a color matrix filter effect. This color matrix takes as input the output of the blur effect. It applies an identity matrix to the color channels of the image.

I'll leave all the color channels the same and tweak the output of the alpha channel to get the result I want. The values `18 -8` in the alpha row multiply the alpha channel by 18 and subtract 8, which amplifies the blending effect.

```html
<svg style="display: none;">
    <filter id="svgfilter">
        <!-- Apply blur effect and store result -->
        <feGaussianBlur stdDeviation="10" result="blur" />
        <!-- Enhance alpha channel for gooey effect -->
        <feColorMatrix in="blur" mode="matrix"
            values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -8" result="colorMatrix" />
    </filter>
</svg>
```

I can also bring back the original gradients for the circles by blending the original source graphic with the output of the color matrix:

```html
<svg style="display: none;">
    <filter id="svgfilter">
        <!-- Apply blur effect and store result -->
        <feGaussianBlur stdDeviation="10" result="blur" />
        <!-- Enhance alpha channel for gooey effect -->
        <feColorMatrix in="blur" mode="matrix"
            values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -8" result="colorMatrix" />
        <!-- Blend original gradients with filtered result -->
        <feBlend in="SourceGraphic" in2="colorMatrix" />
    </filter>
</svg>
```

With that ID in mind, I can set the filter property in the gradient container CSS to reference that filter element.

Update `.gradient-container`:
```css
.gradient-container {
    /* existing styles */
    /* Reference the SVG filter by its ID */
    filter: url(#svgfilter);
}
```

This effect changes depending on how close the circles are. If I pull them apart, you can see they really seem to act as some kind of gooey material. It's a really cool effect.

If you run this code, you'll notice the circles now blend together smoothly when they overlap, creating that gooey, liquid-like effect.

But we can take it even further.

## Add CSS Filter on Top

And if we go to the CSS again, I can still apply any CSS filter on top of it.

Update `.gradient-container`:
```css
.gradient-container {
    /* existing styles */
    /* Combine SVG filter with additional CSS blur */
    filter: url(#svgfilter) blur(40px);
}
```

And it's just a matter of tweaking it a bit to get my desired result. And I end up with this nice gradient background.

To really show off how this gooey effect works, let's add some movement.

## Add Animation to Demonstrate the Effect

Update `.g1` and `.g2`:
```css
.g1 {
    /* existing styles */
    animation: moveApart1 3s ease-in-out infinite;
}

.g2 {
    /* existing styles */
    animation: moveApart2 3s ease-in-out infinite;
}
```

Add the keyframes:
```css
@keyframes moveApart1 {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-150px);
    }
}

@keyframes moveApart2 {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(150px);
    }
}
```

The circles now dynamically separate and reconnect, highlighting the melting goo effect in motion.

I bet you didn't know that SVG filters could create such smooth blending effects. This technique works great for backgrounds, hero sections, or any place where you want that organic, fluid look. If you made it this far, thank you for reading, and feel free to share this if you found it useful.

{{< x user="nemesiscodex" id="1973761290054345142" >}}


Full code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG Filters Demo</title>
    <style>
        body {
            background: linear-gradient(
                40deg, rgb(108, 0, 162), rgb(0, 17, 82)
            );
            margin: 0;
            height: 100vh;
        }
        .gradient-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            filter: url(#svgfilter) blur(40px);
        }

        .circle {
            width: 400px;
            height: 400px;
            margin: -30%;
            border-radius: 70%;
        }

        .g1 {
            background: radial-gradient(
                circle at center,
                rgba(52, 190, 203, 0.8) 0,
                rgba(180, 180, 50, 0) 50%
            ) no-repeat;
            /* Animate circle 1 to move left and right */
            animation: moveApart1 3s ease-in-out infinite;
        }

        .g2 {
            background: radial-gradient(
                circle at center,
                rgba(172, 159, 38, 0.8) 0,
                rgba(16, 202, 248, 0) 50%
            ) no-repeat;
            animation: moveApart2 3s ease-in-out infinite;
        }

        @keyframes moveApart1 {
            0%, 100% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(-150px);
            }
        }

        @keyframes moveApart2 {
            0%, 100% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(150px);
            }
        }
    </style>
</head>
<body>
    <svg style="display: none;">
        <filter id="svgfilter">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
                values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -8" result="colorMatrix" />
            <feBlend in="SourceGraphic" in2="colorMatrix" />
        </filter>
    </svg>
    <div class="gradient-container">
        <div class="circle g1"></div>
        <div class="circle g2"></div>
    </div>
</body>
</html>
```

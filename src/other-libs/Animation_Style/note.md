https://animate.style/


1. install:
   $ npm install animate.css --save

2. import
+ import 'animate.css';

+ <link rel="stylesheet"
   href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

3. Basic usage
+ Add the class "animate__animated" to an element
+ Add the class: "animate__ prefix"
  ++ bounce
  ++ flash
  ++ pulse
  ++ rubberBand
  ++ shakeX
  ++ shakeY
  ++ headShake
  ++ swing
  ++ tada
  ++ wobble
  ++ jello
  ++ heartBeat

4. Using @keyframes
- Change the value of animate lib in a new class

5. CSS Custom Properties (CSS Variables)
- Custom the Properties of animate lib
  Ex:

  /* This only changes this particular animation duration */
  .animate__animated.animate__bounce {
  --animate-duration: 4s;
  }

  /* This changes all the animations globally */
  :root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
  }

6. Utility Classes
- Animate.css comes packed with a few utility classes to simplify its use.

6.1 Delay classes
- add class "animate__delay-2s"
- The min is 2s and max is 5s but you can customize them setting the --animate-delay property to a longer or a shorter duration:

Ex:
:root {
--animate-delay: 0.5s;
}

6.2 Slow, slower, fast, and Faster classes
- You can control the speed of the animation by adding these classes, as below:

Class name	   Default speed time
animate__slow	2s
animate__slower	3s
animate__fast	800ms
animate__faster	500ms

- The animate__animated class has a default speed of 1s. You can also customize the animations duration through the --animate-duration property


6.3 Repeating classes
- You can control the iteration count of the animation by adding these classes, like below:

Class Name	      Default iteration count
animate__repeat-1	1
animate__repeat-2	2
animate__repeat-3	3
animate__infinite	infinite

- The animate__repeat class is based on the --animate-repeat property and default is 1 but you can change it

Ex:
.my-element {
--animate-repeat: 2;
}

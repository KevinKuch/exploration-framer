import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import styles from './style.module.scss';
import { heroTextes } from './text';
import { motion } from 'framer-motion';


export default function Hero() {


    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0; //valeur relative à la position de l'élément
    let direction = -1;

    useEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
          scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,  // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            start: 0,
            end: window.innerHeight,
            onUpdate: e => direction = e.direction * -1
          },
          x: "-500px",
        })
        requestAnimationFrame(animate);
      }, [])

      const animate = () => {
        if(xPercent < -100){
          xPercent = 0;
        }
        else if(xPercent > 0){
          xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        requestAnimationFrame(animate);
        xPercent += 0.1 * direction;
      }

      // SplitText sur les titles de la section
      const SplitText = ({ text }) => {
        const letters = text.split('');

        useEffect(() => {
          gsap.from('.individualLetter', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.1,
            ease: 'power4.out',
          });

          gsap.to('.individualLetter', {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.1,
          });
        }, []);
      
        return (
          <h1 className={styles.textesTitle}>
            {letters.map((letter, index) => (
              <span key={index} className={`${styles.individualLetter} individualLetter`}>
                {letter}
              </span>
            ))}
          </h1>
        );
      };
      


    return (
        <section className={styles.body}>
          <div className={styles.titleSection}>
            <SplitText text="Festivals," />
            <SplitText text="éphémères enchantements" />
          </div>
          <div className={styles.svgWind}>
            <svg width="442" height="342" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 442 342">
              <path fill="none" stroke="#fff" d="M442 58c0 0-82-45-160-57-62-10-108 55-164 39C86 31 65 1 34 8 3 15 0 55 0 55"/>

              <path id="svg_1" d="m442 75c0 0-65-39-120-33-110 8-214 83-259 82-33 0-55-18-52-45 3-21 27-37 53-34 21 2 36 18 34 35-2 14-17 24-34 22-13-1-23-11-21-22 1-9 11-15 22-14 9 1 15 7 14 14-1 6-7 10-14 9-5 0-9-5-9-9" stroke="#fff" fill="none"/>

              <path id="svg_3" d="m442 101c0 0-38-23-124-25-85-2-132 21-136 39s4 27 13 31c7 3 16 0 18-6 2-5-1-12-6-14-5-2-10 0-12 4-1 4 0 8 4 9 3 1 6 0 8-3 1-2 0-5-3-6-2-1-4 0-5 2-1 1 0 3 2 4" stroke="#fff" fill="none"/>
              
              <path id="svg_4" d="m442 165c0 0-103-62-131-52-28 10 23 43-3 59-26 16-144-4-144-4l-165-36" stroke="#fff" fill="none"/>
              
              <path id="svg_5" d="m442 228c0 0-40-43-63-50-22-7-23 41-56 45-122 11-323-53-323-53" stroke="#fff" fill="none"/>
              
              <path id="svg_6" d="m442 278c0 0-22-3-89-18-68-16-127 34-195 35-68 1-157-70-157-70" stroke="#fff" fill="none"/>
            </svg>
          </div>
            
            <div className={styles.sliderContainer}>
                <div ref={slider} className={styles.slider}>
                    <p ref={firstText}>Événements et Festivals -</p>
                    <p ref={secondText}>Événements et Festivals -</p>
                </div>
            </div>
        </section>
    )
}
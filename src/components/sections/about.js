import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 250px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Game AI Agents',
    'Distributed RL System',
    'General and Efficient RL',
    'LLM Post-training Framework',
    'RLVR in Foundation Models',
    'Multi-modal Interactions',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Yazhe Niu. I'm driven by a simple belief: every interesting idea
              deserves to be fully realized, from its initial spark to its final form. As the
              Research Lead of <a href="https://github.com/opendilab">OpenDILab</a> at Shanghai AI
              Lab, I spearheaded the formation of a 20-person team from the ground up. Together, we
              cultivated a thriving ecosystem for our projects, amassing a total of 28,000+ GitHub
              stars. I hold a PhD from <a href="https://mmlab.ie.cuhk.edu.hk/">MMLab</a>, CUHK,
              supervised by Prof. Hongsheng Li.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://www.shlab.org.cn/">a research lab</a> for open-source AI projects,{' '}
              <a href="https://www.sensetime.com/">a large corporation</a> with thousands of GPUs
              cluster for training foundation models. My main focus these days is to build the R&D
              engine for AI-native games by integrating Deep RL with multi-modal foundation models.
              I'm defining a new creative paradigm: <b>Vibe to Game</b>. It's a call for a new
              human-AI symbiosis in game design—machines for generation & analysis, humans for
              imagination & empathy.
            </p>

            <p>
              I also <a href="https://github.com/opendilab/PPOxFamily">launched a course</a> and{' '}
              <a href="https://www.zhihu.com/people/dilab-46/columns">technical blog series</a> that
              introduces a deep 'under-the-hood' understanding of{' '}
              <a href="https://arxiv.org/abs/1707.06347">PPO</a> and{' '}
              <a href="https://arxiv.org/abs/1911.08265">MCTS</a> algorithm, enabling developers to
              wield a single, elegant solution across diverse decision-making AI (e.g. game)
              applications.
            </p>

            <p>Here are a few technologies that I'm deeply expertise in:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;

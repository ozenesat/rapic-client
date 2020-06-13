import React from "react";
import Container from "common/src/components/UI/ContainerTwo";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import API from "../../services/api";
import Router from "next/router";

import ProjectModal from "../ProjectModal";
import { Card, CardWrapper, HeadingWrapper } from "./projects.style";

class Projects extends React.Component {
  state = {
    projects: [],
    isModalOpen: false,
    isLoading: true,
  };

  componentWillMount() {
    API.getRapicProjects()
      .then((projects) => this.setState({ projects, isLoading: false }))
      .catch((err) => this.setState({ projects: [], isLoading: false }));
  }

  setModalState = (isModalOpen) => {
    this.setState({ isModalOpen });
  };

  createProject = (name, description) => {
    const { projects } = this.state;
    API.createProject({ name, description })
      .then((project) => {
        this.setModalState(false);
        this.setState({ projects: [project, ...projects] });
      })
      .catch((err) => {
        alert(err);
      });
  };

  renderProjects = () => {
    const { projects } = this.state;
    if (projects.length < 1) {
      return <span>There is no project found.</span>;
    }

    return projects.map(({ name, description, id }) => (
      <Card onClick={() => Router.push(`/project/${id}`)}>
        <Heading as="h2" content={name} />
        <Heading as="h3" content={description} />
        <Heading as="h3" content={`${0} objects`} />
      </Card>
    ));
  };

  render() {
    const { isModalOpen, isLoading } = this.state;
    return (
      <Container>
        <HeadingWrapper>
          <Heading as="h1" content="My Projects" />
          <Button
            title="New Project"
            onClick={() => this.setModalState(true)}
          />
        </HeadingWrapper>
        <CardWrapper>
          {isLoading ? <span>Loading..</span> : this.renderProjects()}
        </CardWrapper>
        <ProjectModal
          isModalOpen={isModalOpen}
          closeModal={() => this.setModalState(false)}
          createProject={this.createProject}
        />
      </Container>
    );
  }
}
export default Projects;

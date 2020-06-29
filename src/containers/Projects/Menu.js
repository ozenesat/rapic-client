import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import Link from "next/link";
import {
  MenuButton,
  MenuContainer,
  Title,
  TitleWrapper,
  Section,
} from "./projects.style";
import { useActionState, useAppState } from "../../components/AppContext";
import DropdownMenu from "common/src/components/Dropdown";
import EndpointAddModal from "../EndpointModal";

import { splitText } from "../../utils/utils";

function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setModal] = useState(false);
  const globalState = useAppState();
  const { projects } = globalState;
  const [project, setProject] = useState({ id, name: "", rapic_models: [] });

  useEffect(() => {
    const project = projects.find((item) => item.id == id);
    setProject(project);
  }, []);

  return (
    <MenuContainer>
      <DropdownMenu
        iconSize={25}
        content={splitText(project.name, 12)}
        dropdownItems={[
          "All Projects",
          ...projects
            .map((item) => item.name)
            .filter((item) => item != project.name),
        ]}
        className={`dropdown`}
        onSelect={(title) => {
          if (title == "All Projects") {
            router.replace("/dashboard");
          } else {
            const p = projects.find((item) => item.name == title);
            if (p) {
              router.replace("/projects/[id]", `/projects/${p.id}`);
            }
          }
        }}
      />

      <Section>
        <TitleWrapper>
          <Title>Settings</Title>
        </TitleWrapper>
        <Link href="/projects/[id]" as={`/projects/${id}`}>
          <MenuButton
            backgroundColor={
              router.pathname == `/projects/[id]` ? "#d6f3d6" : "white"
            }
          >
            Project
          </MenuButton>
        </Link>
      </Section>
      <Section>
        <TitleWrapper>
          <Title>API Endpoints</Title>
          <Button
            title="Add New"
            className="add-button"
            onClick={() => setModal(true)}
          />
        </TitleWrapper>

        {project &&
          project.rapic_models.map((endpoint) => (
            <MenuButton
              key={`menu-item-${endpoint.id}`}
              onClick={() =>
                Router.push(
                  "/projects/[id]/endpoints/[endpoint]",
                  `/projects/${id}/endpoints/${endpoint.model_name}`,
                  { shallow: true }
                )
              }
              backgroundColor={
                router.query.endpoint == endpoint.model_name
                  ? "#d6f3d6"
                  : "white"
              }
            >
              {endpoint.model_name}
            </MenuButton>
          ))}
      </Section>
      <EndpointAddModal
        isModalOpen={isModalOpen}
        closeModal={() => setModal(false)}
        project={project}
      />
    </MenuContainer>
  );
}

export default Menu;

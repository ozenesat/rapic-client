import { useRouter } from "next/router";
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
import EndpointAddModal from "../EndpointModal";
import { useState } from "react";

function Menu({ project }) {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setModal] = useState(false);
  const setGlobalState = useActionState();
  const globalState = useAppState();

  return (
    <MenuContainer>
      <Heading as="h1" content={project.name} />
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
            <Link
              href={`/projects/[id]/endpoints/[endpoint]`}
              as={`/projects/${id}/endpoints/${endpoint.model_name}`}
              key={`menu-item-${endpoint.id}`}
            >
              <MenuButton
                backgroundColor={
                  router.query.endpoint == endpoint.model_name
                    ? "#d6f3d6"
                    : "white"
                }
              >
                {endpoint.model_name}
              </MenuButton>
            </Link>
          ))}
      </Section>
      <EndpointAddModal
        isModalOpen={isModalOpen}
        closeModal={() => setModal(false)}
      />
    </MenuContainer>
  );
}

export default Menu;

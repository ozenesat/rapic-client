import Router, { useRouter } from "next/router";
import { useState } from "react";
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

import { splitText } from "../../utils/utils";

function Menu({ project }) {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setModal] = useState(false);
  const setGlobalState = useActionState();
  const globalState = useAppState();

  return (
    <MenuContainer>
      <Heading as="h1" content={splitText(project.name, 12)} />
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
      />
    </MenuContainer>
  );
}

export default Menu;

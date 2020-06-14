import { useRouter } from "next/router";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import Link from "next/link";
import API from "../../services/api";

import {
  MenuButton,
  MenuContainer,
  Title,
  TitleWrapper,
  Section,
} from "./projects.style";
import { useState } from "react";
import { useActionState, useAppState } from "../../components/AppContext";
function Menu({ endpoints }) {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(true);
  const setGlobalState = useActionState();
  const globalState = useAppState();

  return (
    <MenuContainer>
      <Heading as="h1" content="My Awsome Idea" />
      <Section>
        <TitleWrapper>
          <Title>Settings</Title>
        </TitleWrapper>
        <Link href="/projects/[id]" as={`/projects/${id}`}>
          <MenuButton>Project</MenuButton>
        </Link>
        <Link href="/projects/[id]/auth/" as={`/projects/${id}/auth/`}>
          <MenuButton>Authentication</MenuButton>
        </Link>
      </Section>
      <Section>
        <TitleWrapper>
          <Title>API Endpoints</Title>
          <Button
            title="Add New"
            className="add-button"
            onClick={() => router.push(`/projects/${id}/endpoints/add`)}
          />
        </TitleWrapper>

        {endpoints && endpoints.map((enpoint) => (
          <Link
            href={`/projects/[id]/endpoints/${enpoint.name}`}
            as={`/projects/${id}/endpoints/${enpoint.name}`}
          >
            <MenuButton>{enpoint.name}</MenuButton>
          </Link>
        ))}
      </Section>
    </MenuContainer>
  );
}

export default Menu;

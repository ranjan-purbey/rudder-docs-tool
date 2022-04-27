import MdxContent from "mdx-file";
import renderComponenet from "./helpers/renderComponent";
import test from "./helpers/test";

const renderer = renderComponenet(MdxContent);
const sections = renderer.root.findAllByType("h2");

test("Sections", (assert) => {
  const REQUIRED_SECTIONS = [
    "Prerequisites",
    "Installing the SDK",
    "Initializaing the RudderStack client",
    "Supported API calls",
    "FAQ",
  ];
  assert(
    sections.length === REQUIRED_SECTIONS.length,
    `Expected ${REQUIRED_SECTIONS.length} sections, found ${sections.length}`
  );

  REQUIRED_SECTIONS.forEach((expectedTitle, index) => {
    const foundTitle = sections[index]?.children[0];
    assert(
      foundTitle === expectedTitle,
      `Section #${
        index + 1
      } expected to be "${expectedTitle}", found "${foundTitle}"`
    );
  });
});

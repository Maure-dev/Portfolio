import { useTranslation } from "react-i18next";
import { SKILL_GROUPS, skillsByGroup } from "../../data/skills";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { TagInterface } from "../tagInterface";
import { Reveal } from "../revealInterface";

export const SectionSkillsInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface labelledBy="skills-title">
      <Reveal>
        <SectionHeadingInterface
          id="skills-title"
          title={t("about.skills.title")}
          subtitle={t("about.skills.subtitle")}
        />
      </Reveal>
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group} delayMs={index * 60}>
            <h3 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
              {t(`about.skills.groups.${group}`)}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {skillsByGroup(group).map((skill) => (
                <TagInterface key={skill.name} as="li" tone="neutral" size="md">
                  {skill.name}
                </TagInterface>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionInterface>
  );
};

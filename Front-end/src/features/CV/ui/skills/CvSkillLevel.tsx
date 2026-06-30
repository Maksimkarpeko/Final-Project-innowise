import type { Mastery } from "../../model/skills/types.skills";

type CvSkillLevelProps = {
    mastery: Mastery;
};

const MASTERY_CONFIG: Record<
    Mastery,
    {
        width: string;
        color: string;
        trackColor: string;
    }
> = {
    Expert: {
        width: "100%",
        color: "#D94646",
        trackColor: "rgba(217, 70, 70, 0.18)",
    },
    Proficient: {
        width: "80%",
        color: "#FFC107",
        trackColor: "rgba(255, 193, 7, 0.18)",
    },
    Competent: {
        width: "60%",
        color: "#3F8F46",
        trackColor: "rgba(63, 143, 70, 0.18)",
    },
    Advanced: {
        width: "40%",
        color: "#1FA0DB",
        trackColor: "rgba(31, 160, 219, 0.18)",
    },
    Novice: {
        width: "20%",
        color: "#767676",
        trackColor: "rgba(255, 255, 255, 0.12)",
    },
};

export const CvSkillLevel = ({ mastery }: CvSkillLevelProps) => {
    const config = MASTERY_CONFIG[mastery];

    return (
        <div
            className="h-[4px] w-[78.66px] shrink-0"
            style={{
                backgroundColor: config.trackColor,
            }}
        >
            <div
                className="h-full"
                style={{
                    width: config.width,
                    backgroundColor: config.color,
                }}
            />
        </div>
    );
};
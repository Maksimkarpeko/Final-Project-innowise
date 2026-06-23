import type { Mastery } from "../../model/types.skills";

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
        trackColor: "#F2B8B8",
    },
    Proficient: {
        width: "80%",
        color: "#FFC107",
        trackColor: "#FFE49E",
    },
    Competent: {
        width: "60%",
        color: "#3F8F46",
        trackColor: "#B8D8BC",
    },
    Advanced: {
        width: "40%",
        color: "#1FA0DB",
        trackColor: "#B9E3F5",
    },
    Novice: {
        width: "20%",
        color: "#767676",
        trackColor: "#D6D6D6",
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
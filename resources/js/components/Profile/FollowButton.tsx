import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "../ui/button";

interface FollowButtonProps {
    following_id: number;
    following_type: "artist" | "curator" | "gallery";
    is_following?: boolean;
    size?: "sm" | "default" | "lg";
}

export default function FollowButton({ following_id, following_type, is_following = false, size = "default" }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(is_following);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);

        if (isFollowing) {
            // Unfollow
            router.delete(
                "/follow",
                {
                    data: {
                        following_id,
                        following_type,
                    },
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsFollowing(false);
                    },
                    onFinish: () => {
                        setIsLoading(false);
                    },
                },
            );
        } else {
            // Follow
            router.post(
                "/follow",
                {
                    following_id,
                    following_type,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsFollowing(true);
                    },
                    onFinish: () => {
                        setIsLoading(false);
                    },
                },
            );
        }
    };

    return (
        <Button onClick={handleClick} disabled={isLoading} size={size} variant={isFollowing ? "outline" : "default"}>
            {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
        </Button>
    );
}

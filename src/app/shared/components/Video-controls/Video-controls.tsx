import { AnimatePresence } from "framer-motion";
import React from "react";
import { Cursor } from "../Cursor/Cursor";
import { LaunchModal } from "../Launch-modal/LaunchModal";
import { Coords } from "../VIdeo/Video";
import { Notification } from "../Notification/Notification";

interface VideoControlsProps {
	isHovered: boolean;
	mousePos: Coords | null;
	isLaunchModalOpen: boolean;
	onCloseModal: () => void;
}

export const VideoControls = ({
	isHovered,
	isLaunchModalOpen,
	mousePos,
	onCloseModal,
}: VideoControlsProps) => {
	return (
		<AnimatePresence>
			{mousePos && isHovered && <Cursor key="cursor" {...mousePos} />}
			{isLaunchModalOpen && (
				<LaunchModal key="modal" onClose={onCloseModal} />
			)}
			<Notification />
		</AnimatePresence>
	);
};

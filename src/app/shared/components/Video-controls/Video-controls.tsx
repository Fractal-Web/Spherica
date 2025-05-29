import { AnimatePresence } from "framer-motion";
import React from "react";
import { Cursor } from "../Cursor/Cursor";
import { LaunchModal } from "../Launch-modal/LaunchModal";
import { Coords } from "../VIdeo/Video";

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
		<>
			<AnimatePresence>
				{mousePos && isHovered && <Cursor {...mousePos} />}
			</AnimatePresence>
			<AnimatePresence>
				{isLaunchModalOpen && <LaunchModal onClose={onCloseModal} />}
			</AnimatePresence>
		</>
	);
};

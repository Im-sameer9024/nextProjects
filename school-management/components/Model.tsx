"use client"

import {AnimatePresence,motion} from 'motion/react'


interface ModelProps {
  openModel: boolean;
  content: React.ReactNode;
}

const Model = ({ openModel, content }: ModelProps) => {
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence initial={false}>
      {openModel ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
        >
          <motion.div
            className="bg-white p-4  w-[90%] lg:w-[60%] rounded-lg "
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Model

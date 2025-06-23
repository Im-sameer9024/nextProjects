import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Home = () => {
  return (
    <div className=" flex flex-col gap-4 p-10">
      <Button variant="elevated">Home</Button>
      <Input />

      <Progress />

      <Textarea />

      <Checkbox />
    </div>
  );
};

export default Home;

import { ListEditorCategoria } from "./ListEditorCategoria";
import { ListEditorCuenta } from "./ListEditorCuenta";
import { ListEditorPerfiles } from "./ListEditorPerfiles";
import { VStack } from "@/components/ui";
import React from "react";

interface Props {
  selectedIndex: number;
}

const EditorList: React.FC<Props> = ({ selectedIndex }) => {
  if (selectedIndex === 0) {
    return <ListEditorCategoria />;
  }
  if (selectedIndex === 1) {
    return <ListEditorPerfiles />;
  }
  if (selectedIndex === 2) {
    return <ListEditorCuenta />;
  }
};

export default EditorList;

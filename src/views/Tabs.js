import * as React from "react";
import {
  TabbedForm,
  FormTab,
  Edit,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  ReferenceManyField,
  DateInput,
  BooleanInput,
  EditButton,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
export default function Tabs() {
  return (
    <div>
      <Edit>
        <TabbedForm>
          <FormTab label="summary">
            <TextInput disabled label="Id" source="id" />
            <TextInput source="title" />
            <TextInput multiline source="teaser" />
          </FormTab>
          <FormTab label="body">
            <RichTextInput source="body" label={false} />
          </FormTab>
          <FormTab label="Miscellaneous">
            <TextInput
              label="Password (if protected post)"
              source="password"
              type="password"
            />
            <DateInput label="Publication date" source="published_at" />
            <BooleanInput
              label="Allow comments?"
              source="commentable"
              defaultValue
            />
            <TextInput disabled label="Nb views" source="views" />
          </FormTab>
          <FormTab label="comments">
            <ReferenceManyField
              reference="comments"
              target="post_id"
              label={false}
            >
              <Datagrid>
                <TextField source="body" />
                <DateField source="created_at" />
                <EditButton />
              </Datagrid>
            </ReferenceManyField>
          </FormTab>
        </TabbedForm>
      </Edit>
      ;
    </div>
  );
}

import React, { useState } from 'react';
import { FormGroup, Label, Row, Col, Input } from 'reactstrap';
import Tags from './Tags';
import Button from '../../layouts/CSS/Button/Button';
import './NewCourse.css';

const TagsSelect = ({ tags, setSelectedTags, selectedTags }) => {
  const [selectedTag, setSelectedTag] = useState({ name: '' });

  const handleAddTag = () => {
    if (selectedTags.find((t) => t.id === selectedTag.id) !== undefined) return;

    const newTag = tags.find((t) => t.id === selectedTag.id);

    setSelectedTags([...selectedTags, newTag]);
  };

  const handleTagChange = (id) => {
    const newTag = tags.find((t) => t.id === id);

    setSelectedTag(newTag);
  };

  const handleTagRemove = (id) =>
    setSelectedTags([...selectedTags.filter((t) => t.id !== id)]);

  return (
    <FormGroup>
      <Row>
        <Label sm={2} for="tags">
          Tags
        </Label>
        <Col sm={9}>
          <Input
            type="select"
            name="tags"
            id="tags"
            value={selectedTag.id}
            onChange={(e) => handleTagChange(e.target.value)}
            className="input_field"
          >
            <option value=""></option>
            {tags.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </Input>
          {selectedTags.map((tag) => (
            <Tags
              name="tagsList"
              key={tag.id}
              tag={tags.find((t) => t.id === tag.id)}
              handleCloseClick={handleTagRemove}
            />
          ))}
        </Col>
        <Col sm={1}>
          <Button
            text="Add"
            type="button"
            onClick={handleAddTag}
            width="60px"
          ></Button>
        </Col>
      </Row>
    </FormGroup>
  );
};

export default TagsSelect;

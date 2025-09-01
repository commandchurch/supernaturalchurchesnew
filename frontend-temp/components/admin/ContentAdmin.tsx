import React from 'react';
import TeachingsManagerEnhanced from './TeachingsManagerEnhanced';
import CourseManagerSupercharged from './CourseManagerSupercharged';

export default function ContentAdmin() {
  return (
    <div className="space-y-8">
      <TeachingsManagerEnhanced />
      <CourseManagerSupercharged />
    </div>
  );
}

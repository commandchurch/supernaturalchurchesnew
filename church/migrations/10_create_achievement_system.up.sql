-- Create the spiritual achievement system tables
-- This system tracks authentic spiritual growth and ministry impact

-- Achievement events table (event sourcing)
CREATE TABLE achievement_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'PRAYER_WARRIOR_ACHIEVED',
        'BIBLE_SCHOLAR_COMPLETED',
        'SOUL_WINNER_MILESTONE',
        'MIRACLE_WORKER_DOCUMENTED',
        'DISCIPLESHIP_LEADER',
        'CHURCH_PLANTER_ACTIVATED',
        'TESTIMONY_SHARED',
        'MINISTRY_SERVICE_COMPLETED'
    )),
    event_data JSONB NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Partition achievement events by month for performance
CREATE TABLE achievement_events_y2024m09 PARTITION OF achievement_events
    FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');

-- User spiritual achievements projection table
CREATE TABLE user_spiritual_achievements (
    user_id TEXT PRIMARY KEY,
    current_spiritual_rank TEXT NOT NULL DEFAULT 'BELIEVER' CHECK (current_spiritual_rank IN (
        'BELIEVER', 'DISCIPLE', 'MINISTER', 'EVANGELIST', 'PASTOR', 'APOSTLE', 'CARDINAL'
    )),
    total_achievements INTEGER NOT NULL DEFAULT 0,
    spiritual_score INTEGER NOT NULL DEFAULT 0,
    prayer_sessions_led INTEGER NOT NULL DEFAULT 0,
    bible_studies_completed INTEGER NOT NULL DEFAULT 0,
    souls_won INTEGER NOT NULL DEFAULT 0,
    miracles_documented INTEGER NOT NULL DEFAULT 0,
    disciples_mentored INTEGER NOT NULL DEFAULT 0,
    churches_planted INTEGER NOT NULL DEFAULT 0,
    testimonies_shared INTEGER NOT NULL DEFAULT 0,
    ministry_hours_served INTEGER NOT NULL DEFAULT 0,
    last_achievement_at TIMESTAMP WITH TIME ZONE,
    rank_achieved_at TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Spiritual achievement definitions table
CREATE TABLE spiritual_achievement_definitions (
    achievement_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'PRAYER', 'BIBLE_STUDY', 'EVANGELISM', 'SUPERNATURAL',
        'DISCIPLESHIP', 'CHURCH_PLANTING', 'TESTIMONY', 'MINISTRY_SERVICE'
    )),
    spiritual_points INTEGER NOT NULL DEFAULT 0,
    requirements JSONB NOT NULL DEFAULT '{}',
    rank_required TEXT CHECK (rank_required IN (
        'BELIEVER', 'DISCIPLE', 'MINISTER', 'EVANGELIST', 'PASTOR', 'APOSTLE', 'CARDINAL'
    )),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Achievement progress tracking
CREATE TABLE achievement_progress (
    user_id TEXT NOT NULL,
    achievement_id TEXT NOT NULL REFERENCES spiritual_achievement_definitions(achievement_id),
    current_progress INTEGER NOT NULL DEFAULT 0,
    target_progress INTEGER NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- Spiritual mentorship relationships
CREATE TABLE spiritual_mentorships (
    mentorship_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_user_id TEXT NOT NULL,
    mentee_user_id TEXT NOT NULL,
    mentorship_type TEXT NOT NULL CHECK (mentorship_type IN (
        'BIBLE_STUDY', 'PRAYER_MINISTRY', 'EVANGELISM', 'DISCIPLESHIP',
        'CHURCH_PLANTING', 'SUPERNATURAL_MINISTRY', 'LEADERSHIP_DEVELOPMENT'
    )),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'PAUSED')),
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(mentor_user_id, mentee_user_id, mentorship_type)
);

-- Ministry impact tracking
CREATE TABLE ministry_impact_records (
    record_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    impact_type TEXT NOT NULL CHECK (impact_type IN (
        'PRAYER_SESSION_LED', 'BIBLE_STUDY_COMPLETED', 'CONVERSION_LEAD',
        'HEALING_PRAYER', 'DELIVERANCE_MINISTRY', 'DISCIPLE_MENTORED',
        'CHURCH_PLANTED', 'TESTIMONY_SHARED', 'MINISTRY_SERVICE'
    )),
    impact_details JSONB NOT NULL,
    location_coordinates POINT,
    location_description TEXT,
    witness_user_ids TEXT[],
    verification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN (
        'PENDING', 'VERIFIED', 'REJECTED'
    )),
    verified_by TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_achievement_events_user_time ON achievement_events(user_id, occurred_at DESC);
CREATE INDEX idx_achievement_events_type ON achievement_events(event_type);
CREATE INDEX idx_achievement_events_data ON achievement_events USING GIN(event_data);
CREATE INDEX idx_user_achievements_rank ON user_spiritual_achievements(current_spiritual_rank);
CREATE INDEX idx_achievement_definitions_category ON spiritual_achievement_definitions(category);
CREATE INDEX idx_achievement_progress_user ON achievement_progress(user_id);
CREATE INDEX idx_mentorships_mentor ON spiritual_mentorships(mentor_user_id);
CREATE INDEX idx_mentorships_mentee ON spiritual_mentorships(mentee_user_id);
CREATE INDEX idx_ministry_impact_user ON ministry_impact_records(user_id);
CREATE INDEX idx_ministry_impact_type ON ministry_impact_records(impact_type);
CREATE INDEX idx_ministry_impact_location ON ministry_impact_records USING GIST(location_coordinates);

-- Seed initial spiritual achievement definitions
INSERT INTO spiritual_achievement_definitions (achievement_id, name, description, category, spiritual_points, requirements, rank_required) VALUES
('first_prayer_session', 'First Prayer Session Leader', 'Lead your first prayer session with at least 3 participants', 'PRAYER', 50, '{"min_participants": 3}', 'BELIEVER'),
('prayer_warrior_bronze', 'Prayer Warrior Bronze', 'Lead 10 prayer sessions', 'PRAYER', 100, '{"sessions_led": 10}', 'BELIEVER'),
('prayer_warrior_silver', 'Prayer Warrior Silver', 'Lead 50 prayer sessions', 'PRAYER', 250, '{"sessions_led": 50}', 'DISCIPLE'),
('prayer_warrior_gold', 'Prayer Warrior Gold', 'Lead 100 prayer sessions', 'PRAYER', 500, '{"sessions_led": 100}', 'MINISTER'),
('bible_study_completion', 'Bible Study Graduate', 'Complete comprehensive Bible study course', 'BIBLE_STUDY', 150, '{"course_id": "comprehensive-bible-study"}', 'BELIEVER'),
('scripture_memory_master', 'Scripture Memory Master', 'Memorize 100 Bible verses', 'BIBLE_STUDY', 200, '{"verses_memorized": 100}', 'DISCIPLE'),
('soul_winner_initiate', 'Soul Winner Initiate', 'Lead first person to Christ', 'EVANGELISM', 300, '{"conversions": 1}', 'BELIEVER'),
('soul_winner_bronze', 'Soul Winner Bronze', 'Lead 5 people to Christ', 'EVANGELISM', 500, '{"conversions": 5}', 'DISCIPLE'),
('healing_prayer_testimony', 'Healing Prayer Testimony', 'Document first supernatural healing', 'SUPERNATURAL', 400, '{"healings": 1}', 'BELIEVER'),
('miracle_worker_bronze', 'Miracle Worker Bronze', 'Document 3 supernatural healings', 'SUPERNATURAL', 600, '{"healings": 3}', 'MINISTER'),
('first_disciple_mentored', 'First Disciple Mentored', 'Successfully mentor first disciple', 'DISCIPLESHIP', 350, '{"disciples_mentored": 1}', 'DISCIPLE'),
('discipleship_leader', 'Discipleship Leader', 'Mentor 10 disciples', 'DISCIPLESHIP', 700, '{"disciples_mentored": 10}', 'EVANGELIST'),
('church_planter_apprentice', 'Church Planter Apprentice', 'Assist in planting first church', 'CHURCH_PLANTING', 800, '{"churches_assisted": 1}', 'PASTOR'),
('church_planter_master', 'Church Planter Master', 'Successfully plant 3 churches', 'CHURCH_PLANTING', 1000, '{"churches_planted": 3}', 'APOSTLE'),
('testimony_sharer', 'Testimony Sharer', 'Share 5 supernatural testimonies', 'TESTIMONY', 100, '{"testimonies_shared": 5}', 'BELIEVER'),
('ministry_servant', 'Ministry Servant', 'Serve 50 hours in ministry', 'MINISTRY_SERVICE', 200, '{"hours_served": 50}', 'BELIEVER'),
('ministry_leader', 'Ministry Leader', 'Serve 500 hours in ministry', 'MINISTRY_SERVICE', 800, '{"hours_served": 500}', 'EVANGELIST');

-- Create function to automatically update user spiritual achievements
CREATE OR REPLACE FUNCTION update_user_spiritual_achievements()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update user achievements record
    INSERT INTO user_spiritual_achievements (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;

    -- Update achievement counts based on event type
    CASE NEW.event_type
        WHEN 'PRAYER_WARRIOR_ACHIEVED' THEN
            UPDATE user_spiritual_achievements
            SET prayer_sessions_led = prayer_sessions_led + (NEW.event_data->>'sessions_led')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'BIBLE_SCHOLAR_COMPLETED' THEN
            UPDATE user_spiritual_achievements
            SET bible_studies_completed = bible_studies_completed + 1,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'SOUL_WINNER_MILESTONE' THEN
            UPDATE user_spiritual_achievements
            SET souls_won = souls_won + (NEW.event_data->>'conversions')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'MIRACLE_WORKER_DOCUMENTED' THEN
            UPDATE user_spiritual_achievements
            SET miracles_documented = miracles_documented + (NEW.event_data->>'healings')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'DISCIPLESHIP_LEADER' THEN
            UPDATE user_spiritual_achievements
            SET disciples_mentored = disciples_mentored + (NEW.event_data->>'disciples_mentored')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'CHURCH_PLANTER_ACTIVATED' THEN
            UPDATE user_spiritual_achievements
            SET churches_planted = churches_planted + (NEW.event_data->>'churches_planted')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'TESTIMONY_SHARED' THEN
            UPDATE user_spiritual_achievements
            SET testimonies_shared = testimonies_shared + 1,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
        WHEN 'MINISTRY_SERVICE_COMPLETED' THEN
            UPDATE user_spiritual_achievements
            SET ministry_hours_served = ministry_hours_served + (NEW.event_data->>'hours_served')::INTEGER,
                last_achievement_at = NEW.occurred_at,
                last_updated = NOW()
            WHERE user_id = NEW.user_id;
    END CASE;

    -- Recalculate spiritual score and rank
    UPDATE user_spiritual_achievements
    SET spiritual_score = (
        prayer_sessions_led * 2 +
        bible_studies_completed * 10 +
        souls_won * 50 +
        miracles_documented * 75 +
        disciples_mentored * 40 +
        churches_planted * 100 +
        testimonies_shared * 5 +
        ministry_hours_served * 3
    ),
    current_spiritual_rank = CASE
        WHEN spiritual_score >= 10000 THEN 'CARDINAL'
        WHEN spiritual_score >= 5000 THEN 'APOSTLE'
        WHEN spiritual_score >= 2500 THEN 'PASTOR'
        WHEN spiritual_score >= 1000 THEN 'EVANGELIST'
        WHEN spiritual_score >= 500 THEN 'MINISTER'
        WHEN spiritual_score >= 100 THEN 'DISCIPLE'
        ELSE 'BELIEVER'
    END,
    rank_achieved_at = CASE
        WHEN current_spiritual_rank != (
            SELECT current_spiritual_rank FROM user_spiritual_achievements WHERE user_id = NEW.user_id
        ) THEN NEW.occurred_at
        ELSE rank_achieved_at
    END
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update achievements
CREATE TRIGGER trigger_update_user_spiritual_achievements
    AFTER INSERT ON achievement_events
    FOR EACH ROW
    EXECUTE FUNCTION update_user_spiritual_achievements();
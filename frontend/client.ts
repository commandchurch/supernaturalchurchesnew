// Legacy Encore client (unused). Kept only for historical context.

// Disable eslint, jshint, and jslint for this file.
/* eslint-disable */
/* jshint ignore:start */
/*jslint-disable*/
import type { CookieWithOptions } from "encore.dev/api";

/**
 * BaseURL is the base URL for calling the Encore application's API.
 */
export type BaseURL = string

export const Local: BaseURL = "http://localhost:5173/api"

/**
 * Environment returns a BaseURL for calling the cloud environment with the given name.
 */
export function Environment(name: string): BaseURL {
    return `https://${name}-.encr.app`
}

/**
 * PreviewEnv returns a BaseURL for calling the preview environment with the given PR number.
 */
export function PreviewEnv(pr: number | string): BaseURL {
    return Environment(`pr${pr}`)
}

const BROWSER = typeof globalThis === "object" && ("window" in globalThis);

/**
 * Client is an API client for the  Encore application.
 */
export class Client {
    public readonly academy: academy.ServiceClient
    public readonly admin: admin.ServiceClient
    public readonly church: church.ServiceClient
    public readonly fund: fund.ServiceClient
    public readonly membership: membership.ServiceClient
    public readonly outreach: outreach.ServiceClient
    public readonly staff: staff.ServiceClient
    public readonly user: user.ServiceClient
    private readonly options: ClientOptions
    private readonly target: string


    /**
     * Creates a Client for calling the public and authenticated APIs of your Encore application.
     *
     * @param target  The target which the client should be configured to use. See Local and Environment for options.
     * @param options Options for the client
     */
    constructor(target: BaseURL, options?: ClientOptions) {
        this.target = target
        this.options = options ?? {}
        const base = new BaseClient(this.target, this.options)
        this.academy = new academy.ServiceClient(base)
        this.admin = new admin.ServiceClient(base)
        this.church = new church.ServiceClient(base)
        this.fund = new fund.ServiceClient(base)
        this.membership = new membership.ServiceClient(base)
        this.outreach = new outreach.ServiceClient(base)
        this.staff = new staff.ServiceClient(base)
        this.user = new user.ServiceClient(base)
    }

    /**
     * Creates a new Encore client with the given client options set.
     *
     * @param options Client options to set. They are merged with existing options.
     **/
    public with(options: ClientOptions): Client {
        return new Client(this.target, {
            ...this.options,
            ...options,
        })
    }
}

/**
 * ClientOptions allows you to override any default behaviour within the generated Encore client.
 */
export interface ClientOptions {
    /**
     * By default the client will use the inbuilt fetch function for making the API requests.
     * however you can override it with your own implementation here if you want to run custom
     * code on each API request made or response received.
     */
    fetcher?: Fetcher

    /** Default RequestInit to be used for the client */
    requestInit?: Omit<RequestInit, "headers"> & { headers?: Record<string, string> }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { completeCourse as api_academy_completeCourse_completeCourse } from "~backend/academy/completeCourse";
import { createCourse as api_academy_createCourse_createCourse } from "~backend/academy/createCourse";
import { createCourseWithModules as api_academy_createCourseWithModules_createCourseWithModules } from "~backend/academy/createCourseWithModules";
import { deleteCourse as api_academy_deleteCourse_deleteCourse } from "~backend/academy/deleteCourse";
import { getCourse as api_academy_getCourse_getCourse } from "~backend/academy/getCourse";
import { getCourseWithModules as api_academy_getCourseWithModules_getCourseWithModules } from "~backend/academy/getCourseWithModules";
import { getProgress as api_academy_getProgress_getProgress } from "~backend/academy/getProgress";
import { listAllCourses as api_academy_listAllCourses_listAllCourses } from "~backend/academy/listAllCourses";
import { listCertificates as api_academy_listCertificates_listCertificates } from "~backend/academy/listCertificates";
import { listCourses as api_academy_listCourses_listCourses } from "~backend/academy/listCourses";
import { submitQuiz as api_academy_submitQuiz_submitQuiz } from "~backend/academy/submitQuiz";
import { updateCourse as api_academy_updateCourse_updateCourse } from "~backend/academy/updateCourse";
import { updateProgress as api_academy_updateProgress_updateProgress } from "~backend/academy/updateProgress";

export namespace academy {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.completeCourse = this.completeCourse.bind(this)
            this.createCourse = this.createCourse.bind(this)
            this.createCourseWithModules = this.createCourseWithModules.bind(this)
            this.deleteCourse = this.deleteCourse.bind(this)
            this.getCourse = this.getCourse.bind(this)
            this.getCourseWithModules = this.getCourseWithModules.bind(this)
            this.getProgress = this.getProgress.bind(this)
            this.listAllCourses = this.listAllCourses.bind(this)
            this.listCertificates = this.listCertificates.bind(this)
            this.listCourses = this.listCourses.bind(this)
            this.submitQuiz = this.submitQuiz.bind(this)
            this.updateCourse = this.updateCourse.bind(this)
            this.updateProgress = this.updateProgress.bind(this)
        }

        /**
         * Marks a course as complete for a user and issues a certificate with their full name.
         */
        public async completeCourse(params: RequestType<typeof api_academy_completeCourse_completeCourse>): Promise<ResponseType<typeof api_academy_completeCourse_completeCourse>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                userId: params.userId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/courses/${encodeURIComponent(params.courseId)}/complete`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_completeCourse_completeCourse>
        }

        /**
         * Creates a new course.
         */
        public async createCourse(params: RequestType<typeof api_academy_createCourse_createCourse>): Promise<ResponseType<typeof api_academy_createCourse_createCourse>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_createCourse_createCourse>
        }

        /**
         * Creates a new course with modules and quiz questions.
         */
        public async createCourseWithModules(params: RequestType<typeof api_academy_createCourseWithModules_createCourseWithModules>): Promise<ResponseType<typeof api_academy_createCourseWithModules_createCourseWithModules>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses/full`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_createCourseWithModules_createCourseWithModules>
        }

        /**
         * Deletes a course.
         */
        public async deleteCourse(params: { id: number }): Promise<ResponseType<typeof api_academy_deleteCourse_deleteCourse>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses/${encodeURIComponent(params.id)}`, {method: "DELETE", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_deleteCourse_deleteCourse>
        }

        /**
         * Gets a specific course by ID
         */
        public async getCourse(params: RequestType<typeof api_academy_getCourse_getCourse>): Promise<ResponseType<typeof api_academy_getCourse_getCourse>> {
            // Convert our params into the objects we need for the request
            const query = makeRecord<string, string | string[]>({
                userId: params.userId,
            })

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/courses/${encodeURIComponent(params.id)}`, {query, method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_getCourse_getCourse>
        }

        /**
         * Gets a course with all its modules and quiz questions.
         */
        public async getCourseWithModules(params: { id: number }): Promise<ResponseType<typeof api_academy_getCourseWithModules_getCourseWithModules>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses/${encodeURIComponent(params.id)}/full`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_getCourseWithModules_getCourseWithModules>
        }

        /**
         * Gets the progress for all published courses for a specific user.
         */
        public async getProgress(params: { userId: string }): Promise<ResponseType<typeof api_academy_getProgress_getProgress>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/progress/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_getProgress_getProgress>
        }

        /**
         * Lists all courses, including unpublished ones, for admin purposes.
         */
        public async listAllCourses(): Promise<ResponseType<typeof api_academy_listAllCourses_listAllCourses>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_listAllCourses_listAllCourses>
        }

        /**
         * Lists all certificates for a specific user.
         */
        public async listCertificates(params: { userId: string }): Promise<ResponseType<typeof api_academy_listCertificates_listCertificates>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/certificates/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_listCertificates_listCertificates>
        }

        /**
         * Lists all published courses
         */
        public async listCourses(): Promise<ResponseType<typeof api_academy_listCourses_listCourses>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/courses`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_listCourses_listCourses>
        }

        /**
         * Submits quiz answers and calculates score. Issues named certificate on pass.
         */
        public async submitQuiz(params: RequestType<typeof api_academy_submitQuiz_submitQuiz>): Promise<ResponseType<typeof api_academy_submitQuiz_submitQuiz>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                answers: params.answers,
                userId:  params.userId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/courses/${encodeURIComponent(params.courseId)}/quiz/submit`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_submitQuiz_submitQuiz>
        }

        /**
         * Updates an existing course.
         */
        public async updateCourse(params: RequestType<typeof api_academy_updateCourse_updateCourse>): Promise<ResponseType<typeof api_academy_updateCourse_updateCourse>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                category:        params.category,
                description:     params.description,
                durationMinutes: params.durationMinutes,
                isPremium:       params.isPremium,
                isPublished:     params.isPublished,
                pdfUrl:          params.pdfUrl,
                thumbnailUrl:    params.thumbnailUrl,
                title:           params.title,
                videoUrl:        params.videoUrl,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/academy/courses/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_updateCourse_updateCourse>
        }

        /**
         * Updates the user's progress for a course. If the course is premium, requires an active membership.
         */
        public async updateProgress(params: RequestType<typeof api_academy_updateProgress_updateProgress>): Promise<ResponseType<typeof api_academy_updateProgress_updateProgress>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                progressPercentage: params.progressPercentage,
                userId:             params.userId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/academy/courses/${encodeURIComponent(params.courseId)}/progress`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_academy_updateProgress_updateProgress>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { createComplianceCategory as api_admin_createComplianceCategory_createComplianceCategory } from "~backend/admin/createComplianceCategory";
import { createComplianceItem as api_admin_createComplianceItem_createComplianceItem } from "~backend/admin/createComplianceItem";
import { getTerms as api_admin_getTerms_getTerms } from "~backend/admin/getTerms";
import { listCompliance as api_admin_listCompliance_listCompliance } from "~backend/admin/listCompliance";
import { updateComplianceCategory as api_admin_updateComplianceCategory_updateComplianceCategory } from "~backend/admin/updateComplianceCategory";
import { updateComplianceItem as api_admin_updateComplianceItem_updateComplianceItem } from "~backend/admin/updateComplianceItem";
import { updateComplianceItemDetails as api_admin_updateComplianceItemDetails_updateComplianceItemDetails } from "~backend/admin/updateComplianceItemDetails";
import { updateTerms as api_admin_updateTerms_updateTerms } from "~backend/admin/updateTerms";

export namespace admin {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.createComplianceCategory = this.createComplianceCategory.bind(this)
            this.createComplianceItem = this.createComplianceItem.bind(this)
            this.getTerms = this.getTerms.bind(this)
            this.listCompliance = this.listCompliance.bind(this)
            this.updateComplianceCategory = this.updateComplianceCategory.bind(this)
            this.updateComplianceItem = this.updateComplianceItem.bind(this)
            this.updateComplianceItemDetails = this.updateComplianceItemDetails.bind(this)
            this.updateTerms = this.updateTerms.bind(this)
        }

        /**
         * Creates a new compliance category.
         */
        public async createComplianceCategory(params: RequestType<typeof api_admin_createComplianceCategory_createComplianceCategory>): Promise<ResponseType<typeof api_admin_createComplianceCategory_createComplianceCategory>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance/categories`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_createComplianceCategory_createComplianceCategory>
        }

        /**
         * Creates a new compliance item under a category.
         */
        public async createComplianceItem(params: RequestType<typeof api_admin_createComplianceItem_createComplianceItem>): Promise<ResponseType<typeof api_admin_createComplianceItem_createComplianceItem>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance/items`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_createComplianceItem_createComplianceItem>
        }

        /**
         * Gets the content of a legal document
         */
        public async getTerms(params: { documentType: string }): Promise<ResponseType<typeof api_admin_getTerms_getTerms>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/terms/${encodeURIComponent(params.documentType)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_getTerms_getTerms>
        }

        /**
         * Lists all compliance categories with their items
         */
        public async listCompliance(): Promise<ResponseType<typeof api_admin_listCompliance_listCompliance>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_listCompliance_listCompliance>
        }

        /**
         * Updates a compliance category's metadata.
         */
        public async updateComplianceCategory(params: RequestType<typeof api_admin_updateComplianceCategory_updateComplianceCategory>): Promise<ResponseType<typeof api_admin_updateComplianceCategory_updateComplianceCategory>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                color:        params.color,
                description:  params.description,
                displayOrder: params.displayOrder,
                icon:         params.icon,
                name:         params.name,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance/categories/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_updateComplianceCategory_updateComplianceCategory>
        }

        /**
         * Updates a compliance item's completion status
         */
        public async updateComplianceItem(params: RequestType<typeof api_admin_updateComplianceItem_updateComplianceItem>): Promise<ResponseType<typeof api_admin_updateComplianceItem_updateComplianceItem>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                completedBy: params.completedBy,
                isCompleted: params.isCompleted,
                notes:       params.notes,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance/items/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_updateComplianceItem_updateComplianceItem>
        }

        /**
         * Updates compliance item fields (not just completion status).
         */
        public async updateComplianceItemDetails(params: RequestType<typeof api_admin_updateComplianceItemDetails_updateComplianceItemDetails>): Promise<ResponseType<typeof api_admin_updateComplianceItemDetails_updateComplianceItemDetails>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                description:  params.description,
                displayOrder: params.displayOrder,
                dueDate:      params.dueDate,
                isRequired:   params.isRequired,
                name:         params.name,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/compliance/items/${encodeURIComponent(params.id)}/details`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_updateComplianceItemDetails_updateComplianceItemDetails>
        }

        /**
         * Updates the content of a legal document
         */
        public async updateTerms(params: RequestType<typeof api_admin_updateTerms_updateTerms>): Promise<ResponseType<typeof api_admin_updateTerms_updateTerms>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                content: params.content,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/terms/${encodeURIComponent(params.documentType)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_admin_updateTerms_updateTerms>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { createEvent as api_church_createEvent_createEvent } from "~backend/church/createEvent";
import { createTeaching as api_church_createTeaching_createTeaching } from "~backend/church/createTeaching";
import { deleteEvent as api_church_deleteEvent_deleteEvent } from "~backend/church/deleteEvent";
import { deleteTeaching as api_church_deleteTeaching_deleteTeaching } from "~backend/church/deleteTeaching";
import { getTeaching as api_church_getTeaching_getTeaching } from "~backend/church/getTeaching";
import { getTestimonyUploadUrl as api_church_getTestimonyUploadUrl_getTestimonyUploadUrl } from "~backend/church/getTestimonyUploadUrl";
import { listAllEvents as api_church_listAllEvents_listAllEvents } from "~backend/church/listAllEvents";
import { listAllTeachings as api_church_listAllTeachings_listAllTeachings } from "~backend/church/listAllTeachings";
import { listEvents as api_church_listEvents_listEvents } from "~backend/church/listEvents";
import { listPrayerReplies as api_church_listPrayerReplies_listPrayerReplies } from "~backend/church/listPrayerReplies";
import { listPrayerRequests as api_church_listPrayerRequests_listPrayerRequests } from "~backend/church/listPrayerRequests";
import { listTeachings as api_church_listTeachings_listTeachings } from "~backend/church/listTeachings";
import { listTestimoniesAdmin as api_church_listTestimoniesAdmin_listTestimoniesAdmin } from "~backend/church/listTestimoniesAdmin";
import { replyPrayerRequest as api_church_replyPrayerRequest_replyPrayerRequest } from "~backend/church/replyPrayerRequest";
import { reviewTestimony as api_church_reviewTestimony_reviewTestimony } from "~backend/church/reviewTestimony";
import { submitPrayerRequest as api_church_submitPrayerRequest_submitPrayerRequest } from "~backend/church/submitPrayerRequest";
import { submitTestimony as api_church_submitTestimony_submitTestimony } from "~backend/church/submitTestimony";
import { updateEvent as api_church_updateEvent_updateEvent } from "~backend/church/updateEvent";
import { updateTeaching as api_church_updateTeaching_updateTeaching } from "~backend/church/updateTeaching";

export namespace church {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.createEvent = this.createEvent.bind(this)
            this.createTeaching = this.createTeaching.bind(this)
            this.deleteEvent = this.deleteEvent.bind(this)
            this.deleteTeaching = this.deleteTeaching.bind(this)
            this.getTeaching = this.getTeaching.bind(this)
            this.getTestimonyUploadUrl = this.getTestimonyUploadUrl.bind(this)
            this.listAllEvents = this.listAllEvents.bind(this)
            this.listAllTeachings = this.listAllTeachings.bind(this)
            this.listEvents = this.listEvents.bind(this)
            this.listPrayerReplies = this.listPrayerReplies.bind(this)
            this.listPrayerRequests = this.listPrayerRequests.bind(this)
            this.listTeachings = this.listTeachings.bind(this)
            this.listTestimoniesAdmin = this.listTestimoniesAdmin.bind(this)
            this.replyPrayerRequest = this.replyPrayerRequest.bind(this)
            this.reviewTestimony = this.reviewTestimony.bind(this)
            this.submitPrayerRequest = this.submitPrayerRequest.bind(this)
            this.submitTestimony = this.submitTestimony.bind(this)
            this.updateEvent = this.updateEvent.bind(this)
            this.updateTeaching = this.updateTeaching.bind(this)
        }

        /**
         * Creates a new event (admin).
         */
        public async createEvent(params: RequestType<typeof api_church_createEvent_createEvent>): Promise<ResponseType<typeof api_church_createEvent_createEvent>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/events`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_createEvent_createEvent>
        }

        /**
         * Creates a new teaching (admin).
         */
        public async createTeaching(params: RequestType<typeof api_church_createTeaching_createTeaching>): Promise<ResponseType<typeof api_church_createTeaching_createTeaching>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/teachings`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_createTeaching_createTeaching>
        }

        /**
         * Deletes an event (admin).
         */
        public async deleteEvent(params: { id: number }): Promise<ResponseType<typeof api_church_deleteEvent_deleteEvent>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/events/${encodeURIComponent(params.id)}`, {method: "DELETE", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_deleteEvent_deleteEvent>
        }

        /**
         * Deletes a teaching (admin).
         */
        public async deleteTeaching(params: { id: number }): Promise<ResponseType<typeof api_church_deleteTeaching_deleteTeaching>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/teachings/${encodeURIComponent(params.id)}`, {method: "DELETE", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_deleteTeaching_deleteTeaching>
        }

        /**
         * Gets a specific teaching by slug
         */
        public async getTeaching(params: { slug: string }): Promise<ResponseType<typeof api_church_getTeaching_getTeaching>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/teachings/${encodeURIComponent(params.slug)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_getTeaching_getTeaching>
        }

        /**
         * Generates a signed upload URL for testimony video uploads.
         */
        public async getTestimonyUploadUrl(params: RequestType<typeof api_church_getTestimonyUploadUrl_getTestimonyUploadUrl>): Promise<ResponseType<typeof api_church_getTestimonyUploadUrl_getTestimonyUploadUrl>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/testimonies/upload-url`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_getTestimonyUploadUrl_getTestimonyUploadUrl>
        }

        /**
         * Lists all events, including unpublished ones (admin).
         */
        public async listAllEvents(): Promise<ResponseType<typeof api_church_listAllEvents_listAllEvents>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/events`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listAllEvents_listAllEvents>
        }

        /**
         * Lists all teachings including drafts (admin).
         */
        public async listAllTeachings(): Promise<ResponseType<typeof api_church_listAllTeachings_listAllTeachings>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/teachings`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listAllTeachings_listAllTeachings>
        }

        /**
         * Lists all published events
         */
        public async listEvents(): Promise<ResponseType<typeof api_church_listEvents_listEvents>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/events`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listEvents_listEvents>
        }

        /**
         * Lists all replies for prayer requests submitted with the given email.
         */
        public async listPrayerReplies(params: RequestType<typeof api_church_listPrayerReplies_listPrayerReplies>): Promise<ResponseType<typeof api_church_listPrayerReplies_listPrayerReplies>> {
            // Convert our params into the objects we need for the request
            const query = makeRecord<string, string | string[]>({
                email: params.email,
            })

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/prayer-replies`, {query, method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listPrayerReplies_listPrayerReplies>
        }

        /**
         * Lists all prayer requests for admin review
         */
        public async listPrayerRequests(): Promise<ResponseType<typeof api_church_listPrayerRequests_listPrayerRequests>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/prayer-requests`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listPrayerRequests_listPrayerRequests>
        }

        /**
         * Lists all published teachings
         */
        public async listTeachings(): Promise<ResponseType<typeof api_church_listTeachings_listTeachings>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/teachings`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listTeachings_listTeachings>
        }

        /**
         * Lists all testimonies for admin review.
         */
        public async listTestimoniesAdmin(): Promise<ResponseType<typeof api_church_listTestimoniesAdmin_listTestimoniesAdmin>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/testimonies`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_listTestimoniesAdmin_listTestimoniesAdmin>
        }

        /**
         * Adds a reply to a prayer request, updates status to 'answered'.
         */
        public async replyPrayerRequest(params: RequestType<typeof api_church_replyPrayerRequest_replyPrayerRequest>): Promise<ResponseType<typeof api_church_replyPrayerRequest_replyPrayerRequest>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                message:        params.message,
                responderEmail: params.responderEmail,
                responderName:  params.responderName,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/prayer-requests/${encodeURIComponent(params.id)}/reply`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_replyPrayerRequest_replyPrayerRequest>
        }

        /**
         * Approves or rejects a testimony (admin).
         */
        public async reviewTestimony(params: RequestType<typeof api_church_reviewTestimony_reviewTestimony>): Promise<ResponseType<typeof api_church_reviewTestimony_reviewTestimony>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                approve:    params.approve,
                notes:      params.notes,
                reviewerId: params.reviewerId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/testimonies/${encodeURIComponent(params.id)}/review`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_reviewTestimony_reviewTestimony>
        }

        /**
         * Submits a prayer request to the church
         */
        public async submitPrayerRequest(params: RequestType<typeof api_church_submitPrayerRequest_submitPrayerRequest>): Promise<ResponseType<typeof api_church_submitPrayerRequest_submitPrayerRequest>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/prayer-requests`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_submitPrayerRequest_submitPrayerRequest>
        }

        /**
         * Submits a testimony (pending review). Consent is required.
         */
        public async submitTestimony(params: RequestType<typeof api_church_submitTestimony_submitTestimony>): Promise<ResponseType<typeof api_church_submitTestimony_submitTestimony>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/church/testimonies`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_submitTestimony_submitTestimony>
        }

        /**
         * Updates an existing event (admin).
         */
        public async updateEvent(params: RequestType<typeof api_church_updateEvent_updateEvent>): Promise<ResponseType<typeof api_church_updateEvent_updateEvent>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                description:  params.description,
                endDate:      params.endDate,
                eventType:    params.eventType,
                isPublished:  params.isPublished,
                locationName: params.locationName,
                startDate:    params.startDate,
                title:        params.title,
                virtualLink:  params.virtualLink,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/events/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_updateEvent_updateEvent>
        }

        /**
         * Updates an existing teaching (admin).
         */
        public async updateTeaching(params: RequestType<typeof api_church_updateTeaching_updateTeaching>): Promise<ResponseType<typeof api_church_updateTeaching_updateTeaching>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                authorId:         params.authorId,
                category:         params.category,
                content:          params.content,
                excerpt:          params.excerpt,
                featuredImageUrl: params.featuredImageUrl,
                isPublished:      params.isPublished,
                publishedAt:      params.publishedAt,
                slug:             params.slug,
                title:            params.title,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/church/teachings/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_church_updateTeaching_updateTeaching>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { approveNeed as api_fund_approveNeed_approveNeed } from "~backend/fund/approveNeed";
import { createDonation as api_fund_createDonation_createDonation } from "~backend/fund/createDonation";
import { financeStream as api_fund_financeStream_financeStream } from "~backend/fund/financeStream";
import { getBalance as api_fund_getBalance_getBalance } from "~backend/fund/getBalance";
import { listNeeds as api_fund_listNeeds_listNeeds } from "~backend/fund/listNeeds";
import { listTransactions as api_fund_listTransactions_listTransactions } from "~backend/fund/listTransactions";
import { rejectNeed as api_fund_rejectNeed_rejectNeed } from "~backend/fund/rejectNeed";
import { submitFundingRequest as api_fund_submitFundingRequest_submitFundingRequest } from "~backend/fund/submitFundingRequest";

export namespace fund {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.approveNeed = this.approveNeed.bind(this)
            this.createDonation = this.createDonation.bind(this)
            this.financeStream = this.financeStream.bind(this)
            this.getBalance = this.getBalance.bind(this)
            this.listNeeds = this.listNeeds.bind(this)
            this.listTransactions = this.listTransactions.bind(this)
            this.rejectNeed = this.rejectNeed.bind(this)
            this.submitFundingRequest = this.submitFundingRequest.bind(this)
        }

        /**
         * Approves a funding need (admin).
         */
        public async approveNeed(params: RequestType<typeof api_fund_approveNeed_approveNeed>): Promise<ResponseType<typeof api_fund_approveNeed_approveNeed>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                reviewerId: params.reviewerId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/needs/${encodeURIComponent(params.id)}/approve`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_approveNeed_approveNeed>
        }

        /**
         * Records a one-time donation (no payment processor integration; records for reconciliation).
         */
        public async createDonation(params: RequestType<typeof api_fund_createDonation_createDonation>): Promise<ResponseType<typeof api_fund_createDonation_createDonation>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/donations`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_createDonation_createDonation>
        }

        /**
         * Streams finance snapshots periodically for live analysis.
         */
        public async financeStream(): Promise<StreamIn<StreamResponse<typeof api_fund_financeStream_financeStream>>> {
            return await this.baseClient.createStreamIn(`/fund/finance/stream`)
        }

        /**
         * Gets the current fund balance
         */
        public async getBalance(): Promise<ResponseType<typeof api_fund_getBalance_getBalance>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/balance`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_getBalance_getBalance>
        }

        /**
         * Lists all fund needs
         */
        public async listNeeds(): Promise<ResponseType<typeof api_fund_listNeeds_listNeeds>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/needs`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_listNeeds_listNeeds>
        }

        /**
         * Lists recent fund transactions
         */
        public async listTransactions(): Promise<ResponseType<typeof api_fund_listTransactions_listTransactions>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/transactions`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_listTransactions_listTransactions>
        }

        /**
         * Rejects a funding need (admin).
         */
        public async rejectNeed(params: RequestType<typeof api_fund_rejectNeed_rejectNeed>): Promise<ResponseType<typeof api_fund_rejectNeed_rejectNeed>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                reason:     params.reason,
                reviewerId: params.reviewerId,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/needs/${encodeURIComponent(params.id)}/reject`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_rejectNeed_rejectNeed>
        }

        /**
         * Submits a funding request for review
         */
        public async submitFundingRequest(params: RequestType<typeof api_fund_submitFundingRequest_submitFundingRequest>): Promise<ResponseType<typeof api_fund_submitFundingRequest_submitFundingRequest>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/fund/requests`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_fund_submitFundingRequest_submitFundingRequest>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { cancelSubscription as api_membership_cancelSubscription_cancelSubscription } from "~backend/membership/cancelSubscription";
import { getSubscription as api_membership_getSubscription_getSubscription } from "~backend/membership/getSubscription";
import { listPlans as api_membership_listPlans_listPlans } from "~backend/membership/listPlans";
import { subscribe as api_membership_subscribe_subscribe } from "~backend/membership/subscribe";

export namespace membership {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.cancelSubscription = this.cancelSubscription.bind(this)
            this.getSubscription = this.getSubscription.bind(this)
            this.listPlans = this.listPlans.bind(this)
            this.subscribe = this.subscribe.bind(this)
        }

        /**
         * Cancels the user's active subscription (end of term simulated).
         */
        public async cancelSubscription(params: { userId: string }): Promise<ResponseType<typeof api_membership_cancelSubscription_cancelSubscription>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/membership/subscription/${encodeURIComponent(params.userId)}/cancel`, {method: "POST", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_membership_cancelSubscription_cancelSubscription>
        }

        /**
         * Gets the current subscription for a user (active if status is 'active').
         */
        public async getSubscription(params: { userId: string }): Promise<ResponseType<typeof api_membership_getSubscription_getSubscription>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/membership/subscription/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_membership_getSubscription_getSubscription>
        }

        /**
         * Lists all membership plans.
         */
        public async listPlans(): Promise<ResponseType<typeof api_membership_listPlans_listPlans>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/membership/plans`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_membership_listPlans_listPlans>
        }

        /**
         * Creates or updates a user's subscription to the given plan (simulated billing).
         */
        public async subscribe(params: RequestType<typeof api_membership_subscribe_subscribe>): Promise<ResponseType<typeof api_membership_subscribe_subscribe>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/membership/subscribe`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_membership_subscribe_subscribe>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { approveWithdrawal as api_outreach_approveWithdrawal_approveWithdrawal } from "~backend/outreach/approveWithdrawal";
import { createGuide as api_outreach_createGuide_createGuide } from "~backend/outreach/createGuide";
import { getDownline as api_outreach_getDownline_getDownline } from "~backend/outreach/getDownline";
import { getProfile as api_outreach_getProfile_getProfile } from "~backend/outreach/getProfile";
import { getStats as api_outreach_getStats_getStats } from "~backend/outreach/getStats";
import { joinProgram as api_outreach_joinProgram_joinProgram } from "~backend/outreach/joinProgram";
import { listGuides as api_outreach_listGuides_listGuides } from "~backend/outreach/listGuides";
import { listLeaderboard as api_outreach_listLeaderboard_listLeaderboard } from "~backend/outreach/listLeaderboard";
import { listPayouts as api_outreach_listPayouts_listPayouts } from "~backend/outreach/listPayouts";
import { listProfiles as api_outreach_listProfiles_listProfiles } from "~backend/outreach/listProfiles";
import { listWithdrawals as api_outreach_listWithdrawals_listWithdrawals } from "~backend/outreach/listWithdrawals";
import { seedNetwork as api_outreach_seedNetwork_seedNetwork } from "~backend/outreach/seedNetwork";

export namespace outreach {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.approveWithdrawal = this.approveWithdrawal.bind(this)
            this.createGuide = this.createGuide.bind(this)
            this.getDownline = this.getDownline.bind(this)
            this.getProfile = this.getProfile.bind(this)
            this.getStats = this.getStats.bind(this)
            this.joinProgram = this.joinProgram.bind(this)
            this.listGuides = this.listGuides.bind(this)
            this.listLeaderboard = this.listLeaderboard.bind(this)
            this.listPayouts = this.listPayouts.bind(this)
            this.listProfiles = this.listProfiles.bind(this)
            this.listWithdrawals = this.listWithdrawals.bind(this)
            this.seedNetwork = this.seedNetwork.bind(this)
        }

        /**
         * Approves a withdrawal request.
         */
        public async approveWithdrawal(params: { id: number }): Promise<ResponseType<typeof api_outreach_approveWithdrawal_approveWithdrawal>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/withdrawals/${encodeURIComponent(params.id)}/approve`, {method: "POST", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_approveWithdrawal_approveWithdrawal>
        }

        /**
         * Creates a new outreach guide
         */
        public async createGuide(params: RequestType<typeof api_outreach_createGuide_createGuide>): Promise<ResponseType<typeof api_outreach_createGuide_createGuide>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/guides`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_createGuide_createGuide>
        }

        /**
         * Builds the full downline tree for a user (all depths).
         */
        public async getDownline(params: { userId: string }): Promise<ResponseType<typeof api_outreach_getDownline_getDownline>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/downline/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_getDownline_getDownline>
        }

        /**
         * Gets a user's affiliate profile, if it exists.
         */
        public async getProfile(params: { userId: string }): Promise<ResponseType<typeof api_outreach_getProfile_getProfile>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/profile/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_getProfile_getProfile>
        }

        /**
         * Gets affiliate stats for a user
         */
        public async getStats(params: { userId: string }): Promise<ResponseType<typeof api_outreach_getStats_getStats>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/stats/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_getStats_getStats>
        }

        /**
         * Allows a user to join the Soul Outreach affiliate program.
         */
        public async joinProgram(params: RequestType<typeof api_outreach_joinProgram_joinProgram>): Promise<ResponseType<typeof api_outreach_joinProgram_joinProgram>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/join`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_joinProgram_joinProgram>
        }

        /**
         * Lists all outreach guides
         */
        public async listGuides(): Promise<ResponseType<typeof api_outreach_listGuides_listGuides>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/guides`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_listGuides_listGuides>
        }

        /**
         * Lists top affiliates by total earnings (or weekly earnings if equal)
         */
        public async listLeaderboard(params: RequestType<typeof api_outreach_listLeaderboard_listLeaderboard>): Promise<ResponseType<typeof api_outreach_listLeaderboard_listLeaderboard>> {
            // Convert our params into the objects we need for the request
            const query = makeRecord<string, string | string[]>({
                limit: params.limit === undefined ? undefined : String(params.limit),
            })

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/leaderboard`, {query, method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_listLeaderboard_listLeaderboard>
        }

        /**
         * Lists commission payouts for a user
         */
        public async listPayouts(params: { userId: string }): Promise<ResponseType<typeof api_outreach_listPayouts_listPayouts>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/payouts/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_listPayouts_listPayouts>
        }

        /**
         * Lists all affiliate profiles with direct referral counts and earnings
         */
        public async listProfiles(): Promise<ResponseType<typeof api_outreach_listProfiles_listProfiles>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/profiles`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_listProfiles_listProfiles>
        }

        /**
         * Lists all withdrawal requests (most recent first)
         */
        public async listWithdrawals(): Promise<ResponseType<typeof api_outreach_listWithdrawals_listWithdrawals>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/withdrawals`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_listWithdrawals_listWithdrawals>
        }

        /**
         * Seeds a rich demo network for Outreach so the dashboard shows a full MLM structure.
         */
        public async seedNetwork(): Promise<ResponseType<typeof api_outreach_seedNetwork_seedNetwork>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/outreach/seed`, {method: "POST", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_outreach_seedNetwork_seedNetwork>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { createStaff as api_staff_createStaff_createStaff } from "~backend/staff/createStaff";
import { getCompliance as api_staff_getCompliance_getCompliance } from "~backend/staff/getCompliance";
import { getDocUploadUrl as api_staff_getDocUploadUrl_getDocUploadUrl } from "~backend/staff/getDocUploadUrl";
import { listStaff as api_staff_listStaff_listStaff } from "~backend/staff/listStaff";
import { sendForms as api_staff_sendForms_sendForms } from "~backend/staff/sendForms";
import { updateStaff as api_staff_updateStaff_updateStaff } from "~backend/staff/updateStaff";

export namespace staff {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.createStaff = this.createStaff.bind(this)
            this.getCompliance = this.getCompliance.bind(this)
            this.getDocUploadUrl = this.getDocUploadUrl.bind(this)
            this.listStaff = this.listStaff.bind(this)
            this.sendForms = this.sendForms.bind(this)
            this.updateStaff = this.updateStaff.bind(this)
        }

        public async createStaff(params: RequestType<typeof api_staff_createStaff_createStaff>): Promise<ResponseType<typeof api_staff_createStaff_createStaff>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff`, {method: "POST", body: JSON.stringify(params)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_createStaff_createStaff>
        }

        /**
         * Returns a single staff profile with derived compliance status.
         */
        public async getCompliance(params: { id: number }): Promise<ResponseType<typeof api_staff_getCompliance_getCompliance>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff/${encodeURIComponent(params.id)}/compliance`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_getCompliance_getCompliance>
        }

        public async getDocUploadUrl(params: RequestType<typeof api_staff_getDocUploadUrl_getDocUploadUrl>): Promise<ResponseType<typeof api_staff_getDocUploadUrl_getDocUploadUrl>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                docType:       params.docType,
                fileExtension: params.fileExtension,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff/${encodeURIComponent(params.staffId)}/doc-upload-url`, {method: "POST", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_getDocUploadUrl_getDocUploadUrl>
        }

        /**
         * Lists all staff/volunteer profiles with derived compliance status.
         */
        public async listStaff(): Promise<ResponseType<typeof api_staff_listStaff_listStaff>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_listStaff_listStaff>
        }

        /**
         * Marks forms as sent; in a real system we'd email or push a dashboard notification.
         */
        public async sendForms(params: { id: number }): Promise<ResponseType<typeof api_staff_sendForms_sendForms>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff/${encodeURIComponent(params.id)}/send-forms`, {method: "POST", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_sendForms_sendForms>
        }

        public async updateStaff(params: RequestType<typeof api_staff_updateStaff_updateStaff>): Promise<ResponseType<typeof api_staff_updateStaff_updateStaff>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                avatarUrl:                params.avatarUrl,
                backgroundCheckCompleted: params.backgroundCheckCompleted,
                blueCardExpiry:           params.blueCardExpiry,
                blueCardNumber:           params.blueCardNumber,
                driversLicenseFrontUrl:   params.driversLicenseFrontUrl,
                email:                    params.email,
                fullName:                 params.fullName,
                mobile:                   params.mobile,
                paid:                     params.paid,
                policeCheckCompleted:     params.policeCheckCompleted,
                policyAcknowledged:       params.policyAcknowledged,
                trainingCompletedManual:  params.trainingCompletedManual,
                userId:                   params.userId,
                wantsChildrenWork:        params.wantsChildrenWork,
                wantsMinistryTeam:        params.wantsMinistryTeam,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/admin/staff/${encodeURIComponent(params.id)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_staff_updateStaff_updateStaff>
        }
    }
}

/**
 * Import the endpoint handlers to derive the types for the client.
 */
import { getProfile as api_user_getProfile_getProfile } from "~backend/user/getProfile";
import { updateProfile as api_user_updateProfile_updateProfile } from "~backend/user/updateProfile";

export namespace user {

    export class ServiceClient {
        private baseClient: BaseClient

        constructor(baseClient: BaseClient) {
            this.baseClient = baseClient
            this.getProfile = this.getProfile.bind(this)
            this.updateProfile = this.updateProfile.bind(this)
        }

        /**
         * Gets a user's profile information.
         */
        public async getProfile(params: { userId: string }): Promise<ResponseType<typeof api_user_getProfile_getProfile>> {
            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/user/profile/${encodeURIComponent(params.userId)}`, {method: "GET", body: undefined})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_user_getProfile_getProfile>
        }

        /**
         * Updates a user's profile information.
         */
        public async updateProfile(params: RequestType<typeof api_user_updateProfile_updateProfile>): Promise<ResponseType<typeof api_user_updateProfile_updateProfile>> {
            // Construct the body with only the fields which we want encoded within the body (excluding query string or header fields)
            const body: Record<string, any> = {
                email:             params.email,
                name:              params.name,
                usdtWalletAddress: params.usdtWalletAddress,
            }

            // Now make the actual call to the API
            const resp = await this.baseClient.callTypedAPI(`/user/profile/${encodeURIComponent(params.userId)}`, {method: "PUT", body: JSON.stringify(body)})
            return JSON.parse(await resp.text(), dateReviver) as ResponseType<typeof api_user_updateProfile_updateProfile>
        }
    }
}


type PickMethods<Type> = Omit<CallParameters, "method"> & { method?: Type };

// Helper type to omit all fields that are cookies.
type OmitCookie<T> = {
  [K in keyof T as T[K] extends CookieWithOptions<any> ? never : K]: T[K];
};

type RequestType<Type extends (...args: any[]) => any> =
  Parameters<Type> extends [infer H, ...any[]]
    ? OmitCookie<H>
    : void;

type ResponseType<Type extends (...args: any[]) => any> = OmitCookie<Awaited<ReturnType<Type>>>;

function dateReviver(key: string, value: any): any {
  if (
    typeof value === "string" &&
    value.length >= 10 &&
    value.charCodeAt(0) >= 48 && // '0'
    value.charCodeAt(0) <= 57 // '9'
  ) {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  return value;
}


function encodeQuery(parts: Record<string, string | string[]>): string {
    const pairs: string[] = []
    for (const key in parts) {
        const val = (Array.isArray(parts[key]) ?  parts[key] : [parts[key]]) as string[]
        for (const v of val) {
            pairs.push(`${key}=${encodeURIComponent(v)}`)
        }
    }
    return pairs.join("&")
}

// makeRecord takes a record and strips any undefined values from it,
// and returns the same record with a narrower type.
// @ts-ignore - TS ignore because makeRecord is not always used
function makeRecord<K extends string | number | symbol, V>(record: Record<K, V | undefined>): Record<K, V> {
    for (const key in record) {
        if (record[key] === undefined) {
            delete record[key]
        }
    }
    return record as Record<K, V>
}

import {
  StreamInOutHandlerFn,
  StreamInHandlerFn,
  StreamOutHandlerFn,
} from "encore.dev/api";

type StreamRequest<Type> = Type extends
  | StreamInOutHandlerFn<any, infer Req, any>
  | StreamInHandlerFn<any, infer Req, any>
  | StreamOutHandlerFn<any, any>
  ? Req
  : never;

type StreamResponse<Type> = Type extends
  | StreamInOutHandlerFn<any, any, infer Resp>
  | StreamInHandlerFn<any, any, infer Resp>
  | StreamOutHandlerFn<any, infer Resp>
  ? Resp
  : never;


function encodeWebSocketHeaders(headers: Record<string, string>) {
    // url safe, no pad
    const base64encoded = btoa(JSON.stringify(headers))
      .replaceAll("=", "")
      .replaceAll("+", "-")
      .replaceAll("/", "_");
    return "encore.dev.headers." + base64encoded;
}

class WebSocketConnection {
    public ws: WebSocket;

    private hasUpdateHandlers: (() => void)[] = [];

    constructor(url: string, headers?: Record<string, string>) {
        let protocols = ["encore-ws"];
        if (headers) {
            protocols.push(encodeWebSocketHeaders(headers))
        }

        this.ws = new WebSocket(url, protocols)

        this.on("error", () => {
            this.resolveHasUpdateHandlers();
        });

        this.on("close", () => {
            this.resolveHasUpdateHandlers();
        });
    }

    resolveHasUpdateHandlers() {
        const handlers = this.hasUpdateHandlers;
        this.hasUpdateHandlers = [];

        for (const handler of handlers) {
            handler()
        }
    }

    async hasUpdate() {
        // await until a new message have been received, or the socket is closed
        await new Promise((resolve) => {
            this.hasUpdateHandlers.push(() => resolve(null))
        });
    }

    on(type: "error" | "close" | "message" | "open", handler: (event: any) => void) {
        this.ws.addEventListener(type, handler);
    }

    off(type: "error" | "close" | "message" | "open", handler: (event: any) => void) {
        this.ws.removeEventListener(type, handler);
    }

    close() {
        this.ws.close();
    }
}

export class StreamInOut<Request, Response> {
    public socket: WebSocketConnection;
    private buffer: Response[] = [];

    constructor(url: string, headers?: Record<string, string>) {
        this.socket = new WebSocketConnection(url, headers);
        this.socket.on("message", (event: any) => {
            this.buffer.push(JSON.parse(event.data, dateReviver));
            this.socket.resolveHasUpdateHandlers();
        });
    }

    close() {
        this.socket.close();
    }

    async send(msg: Request) {
        if (this.socket.ws.readyState === WebSocket.CONNECTING) {
            // await that the socket is opened
            await new Promise((resolve) => {
                this.socket.ws.addEventListener("open", resolve, { once: true });
            });
        }

        return this.socket.ws.send(JSON.stringify(msg));
    }

    async next(): Promise<Response | undefined> {
        for await (const next of this) return next;
        return undefined;
    }

    async *[Symbol.asyncIterator](): AsyncGenerator<Response, undefined, void> {
        while (true) {
            if (this.buffer.length > 0) {
                yield this.buffer.shift() as Response;
            } else {
                if (this.socket.ws.readyState === WebSocket.CLOSED) return;
                await this.socket.hasUpdate();
            }
        }
    }
}

export class StreamIn<Response> {
    public socket: WebSocketConnection;
    private buffer: Response[] = [];

    constructor(url: string, headers?: Record<string, string>) {
        this.socket = new WebSocketConnection(url, headers);
        this.socket.on("message", (event: any) => {
            this.buffer.push(JSON.parse(event.data, dateReviver));
            this.socket.resolveHasUpdateHandlers();
        });
    }

    close() {
        this.socket.close();
    }

    async next(): Promise<Response | undefined> {
        for await (const next of this) return next;
        return undefined;
    }

    async *[Symbol.asyncIterator](): AsyncGenerator<Response, undefined, void> {
        while (true) {
            if (this.buffer.length > 0) {
                yield this.buffer.shift() as Response;
            } else {
                if (this.socket.ws.readyState === WebSocket.CLOSED) return;
                await this.socket.hasUpdate();
            }
        }
    }
}

export class StreamOut<Request, Response> {
    public socket: WebSocketConnection;
    private responseValue: Promise<Response>;

    constructor(url: string, headers?: Record<string, string>) {
        let responseResolver: (_: any) => void;
        this.responseValue = new Promise((resolve) => responseResolver = resolve);

        this.socket = new WebSocketConnection(url, headers);
        this.socket.on("message", (event: any) => {
            responseResolver(JSON.parse(event.data, dateReviver))
        });
    }

    async response(): Promise<Response> {
        return this.responseValue;
    }

    close() {
        this.socket.close();
    }

    async send(msg: Request) {
        if (this.socket.ws.readyState === WebSocket.CONNECTING) {
            // await that the socket is opened
            await new Promise((resolve) => {
                this.socket.ws.addEventListener("open", resolve, { once: true });
            });
        }

        return this.socket.ws.send(JSON.stringify(msg));
    }
}
// CallParameters is the type of the parameters to a method call, but require headers to be a Record type
type CallParameters = Omit<RequestInit, "headers"> & {
    /** Headers to be sent with the request */
    headers?: Record<string, string>

    /** Query parameters to be sent with the request */
    query?: Record<string, string | string[]>
}


// A fetcher is the prototype for the inbuilt Fetch function
export type Fetcher = typeof fetch;

const boundFetch = fetch.bind(this);

class BaseClient {
    readonly baseURL: string
    readonly fetcher: Fetcher
    readonly headers: Record<string, string>
    readonly requestInit: Omit<RequestInit, "headers"> & { headers?: Record<string, string> }

    constructor(baseURL: string, options: ClientOptions) {
        this.baseURL = baseURL
        this.headers = {}

        // Add User-Agent header if the script is running in the server
        // because browsers do not allow setting User-Agent headers to requests
        if (!BROWSER) {
            this.headers["User-Agent"] = "-Generated-TS-Client (Encore/1.48.8)";
        }

        this.requestInit = options.requestInit ?? {};

        // Setup what fetch function we'll be using in the base client
        if (options.fetcher !== undefined) {
            this.fetcher = options.fetcher
        } else {
            this.fetcher = boundFetch
        }
    }

    async getAuthData(): Promise<CallParameters | undefined> {
        return undefined;
    }

    // createStreamInOut sets up a stream to a streaming API endpoint.
    async createStreamInOut<Request, Response>(path: string, params?: CallParameters): Promise<StreamInOut<Request, Response>> {
        let { query, headers } = params ?? {};

        // Fetch auth data if there is any
        const authData = await this.getAuthData();

        // If we now have authentication data, add it to the request
        if (authData) {
            if (authData.query) {
                query = {...query, ...authData.query};
            }
            if (authData.headers) {
                headers = {...headers, ...authData.headers};
            }
        }

        const queryString = query ? '?' + encodeQuery(query) : ''
        return new StreamInOut(this.baseURL + path + queryString, headers);
    }

    // createStreamIn sets up a stream to a streaming API endpoint.
    async createStreamIn<Response>(path: string, params?: CallParameters): Promise<StreamIn<Response>> {
        let { query, headers } = params ?? {};

        // Fetch auth data if there is any
        const authData = await this.getAuthData();

        // If we now have authentication data, add it to the request
        if (authData) {
            if (authData.query) {
                query = {...query, ...authData.query};
            }
            if (authData.headers) {
                headers = {...headers, ...authData.headers};
            }
        }

        const queryString = query ? '?' + encodeQuery(query) : ''
        return new StreamIn(this.baseURL + path + queryString, headers);
    }

    // createStreamOut sets up a stream to a streaming API endpoint.
    async createStreamOut<Request, Response>(path: string, params?: CallParameters): Promise<StreamOut<Request, Response>> {
        let { query, headers } = params ?? {};

        // Fetch auth data if there is any
        const authData = await this.getAuthData();

        // If we now have authentication data, add it to the request
        if (authData) {
            if (authData.query) {
                query = {...query, ...authData.query};
            }
            if (authData.headers) {
                headers = {...headers, ...authData.headers};
            }
        }

        const queryString = query ? '?' + encodeQuery(query) : ''
        return new StreamOut(this.baseURL + path + queryString, headers);
    }

    // callTypedAPI makes an API call, defaulting content type to "application/json"
    public async callTypedAPI(path: string, params?: CallParameters): Promise<Response> {
        return this.callAPI(path, {
            ...params,
            headers: { "Content-Type": "application/json", ...params?.headers }
        });
    }

    // callAPI is used by each generated API method to actually make the request
    public async callAPI(path: string, params?: CallParameters): Promise<Response> {
        let { query, headers, ...rest } = params ?? {}
        const init = {
            ...this.requestInit,
            ...rest,
        }

        // Merge our headers with any predefined headers
        init.headers = {...this.headers, ...init.headers, ...headers}

        // Fetch auth data if there is any
        const authData = await this.getAuthData();

        // If we now have authentication data, add it to the request
        if (authData) {
            if (authData.query) {
                query = {...query, ...authData.query};
            }
            if (authData.headers) {
                init.headers = {...init.headers, ...authData.headers};
            }
        }

        // Make the actual request
        const queryString = query ? '?' + encodeQuery(query) : ''
        const response = await this.fetcher(this.baseURL+path+queryString, init)

        // handle any error responses
        if (!response.ok) {
            // try and get the error message from the response body
            let body: APIErrorResponse = { code: ErrCode.Unknown, message: `request failed: status ${response.status}` }

            // if we can get the structured error we should, otherwise give a best effort
            try {
                const text = await response.text()

                try {
                    const jsonBody = JSON.parse(text)
                    if (isAPIErrorResponse(jsonBody)) {
                        body = jsonBody
                    } else {
                        body.message += ": " + JSON.stringify(jsonBody)
                    }
                } catch {
                    body.message += ": " + text
                }
            } catch (e) {
                // otherwise we just append the text to the error message
                body.message += ": " + String(e)
            }

            throw new APIError(response.status, body)
        }

        return response
    }
}

/**
 * APIErrorDetails represents the response from an Encore API in the case of an error
 */
interface APIErrorResponse {
    code: ErrCode
    message: string
    details?: any
}

function isAPIErrorResponse(err: any): err is APIErrorResponse {
    return (
        err !== undefined && err !== null &&
        isErrCode(err.code) &&
        typeof(err.message) === "string" &&
        (err.details === undefined || err.details === null || typeof(err.details) === "object")
    )
}

function isErrCode(code: any): code is ErrCode {
    return code !== undefined && Object.values(ErrCode).includes(code)
}

/**
 * APIError represents a structured error as returned from an Encore application.
 */
export class APIError extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    public readonly status: number

    /**
     * The Encore error code
     */
    public readonly code: ErrCode

    /**
     * The error details
     */
    public readonly details?: any

    constructor(status: number, response: APIErrorResponse) {
        // extending errors causes issues after you construct them, unless you apply the following fixes
        super(response.message);

        // set error name as constructor name, make it not enumerable to keep native Error behavior
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
        Object.defineProperty(this, 'name', {
            value:        'APIError',
            enumerable:   false,
            configurable: true,
        })

        // fix the prototype chain
        if ((Object as any).setPrototypeOf == undefined) {
            (this as any).__proto__ = APIError.prototype
        } else {
            Object.setPrototypeOf(this, APIError.prototype);
        }

        // capture a stack trace
        if ((Error as any).captureStackTrace !== undefined) {
            (Error as any).captureStackTrace(this, this.constructor);
        }

        this.status = status
        this.code = response.code
        this.details = response.details
    }
}

/**
 * Typeguard allowing use of an APIError's fields'
 */
export function isAPIError(err: any): err is APIError {
    return err instanceof APIError;
}

export enum ErrCode {
    /**
     * OK indicates the operation was successful.
     */
    OK = "ok",

    /**
     * Canceled indicates the operation was canceled (typically by the caller).
     *
     * Encore will generate this error code when cancellation is requested.
     */
    Canceled = "canceled",

    /**
     * Unknown error. An example of where this error may be returned is
     * if a Status value received from another address space belongs to
     * an error-space that is not known in this address space. Also
     * errors raised by APIs that do not return enough error information
     * may be converted to this error.
     *
     * Encore will generate this error code in the above two mentioned cases.
     */
    Unknown = "unknown",

    /**
     * InvalidArgument indicates client specified an invalid argument.
     * Note that this differs from FailedPrecondition. It indicates arguments
     * that are problematic regardless of the state of the system
     * (e.g., a malformed file name).
     *
     * This error code will not be generated by the gRPC framework.
     */
    InvalidArgument = "invalid_argument",

    /**
     * DeadlineExceeded means operation expired before completion.
     * For operations that change the state of the system, this error may be
     * returned even if the operation has completed successfully. For
     * example, a successful response from a server could have been delayed
     * long enough for the deadline to expire.
     *
     * The gRPC framework will generate this error code when the deadline is
     * exceeded.
     */
    DeadlineExceeded = "deadline_exceeded",

    /**
     * NotFound means some requested entity (e.g., file or directory) was
     * not found.
     *
     * This error code will not be generated by the gRPC framework.
     */
    NotFound = "not_found",

    /**
     * AlreadyExists means an attempt to create an entity failed because one
     * already exists.
     *
     * This error code will not be generated by the gRPC framework.
     */
    AlreadyExists = "already_exists",

    /**
     * PermissionDenied indicates the caller does not have permission to
     * execute the specified operation. It must not be used for rejections
     * caused by exhausting some resource (use ResourceExhausted
     * instead for those errors). It must not be
     * used if the caller cannot be identified (use Unauthenticated
     * instead for those errors).
     *
     * This error code will not be generated by the gRPC core framework,
     * but expect authentication middleware to use it.
     */
    PermissionDenied = "permission_denied",

    /**
     * ResourceExhausted indicates some resource has been exhausted, perhaps
     * a per-user quota, or perhaps the entire file system is out of space.
     *
     * This error code will be generated by the gRPC framework in
     * out-of-memory and server overload situations, or when a message is
     * larger than the configured maximum size.
     */
    ResourceExhausted = "resource_exhausted",

    /**
     * FailedPrecondition indicates operation was rejected because the
     * system is not in a state required for the operation's execution.
     * For example, directory to be deleted may be non-empty, an rmdir
     * operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FailedPrecondition, Aborted, and Unavailable:
     *  (a) Use Unavailable if the client can retry just the failing call.
     *  (b) Use Aborted if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FailedPrecondition if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FailedPrecondition
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FailedPrecondition if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     *
     * This error code will not be generated by the gRPC framework.
     */
    FailedPrecondition = "failed_precondition",

    /**
     * Aborted indicates the operation was aborted, typically due to a
     * concurrency issue like sequencer check failures, transaction aborts,
     * etc.
     *
     * See litmus test above for deciding between FailedPrecondition,
     * Aborted, and Unavailable.
     */
    Aborted = "aborted",

    /**
     * OutOfRange means operation was attempted past the valid range.
     * E.g., seeking or reading past end of file.
     *
     * Unlike InvalidArgument, this error indicates a problem that may
     * be fixed if the system state changes. For example, a 32-bit file
     * system will generate InvalidArgument if asked to read at an
     * offset that is not in the range [0,2^32-1], but it will generate
     * OutOfRange if asked to read from an offset past the current
     * file size.
     *
     * There is a fair bit of overlap between FailedPrecondition and
     * OutOfRange. We recommend using OutOfRange (the more specific
     * error) when it applies so that callers who are iterating through
     * a space can easily look for an OutOfRange error to detect when
     * they are done.
     *
     * This error code will not be generated by the gRPC framework.
     */
    OutOfRange = "out_of_range",

    /**
     * Unimplemented indicates operation is not implemented or not
     * supported/enabled in this service.
     *
     * This error code will be generated by the gRPC framework. Most
     * commonly, you will see this error code when a method implementation
     * is missing on the server. It can also be generated for unknown
     * compression algorithms or a disagreement as to whether an RPC should
     * be streaming.
     */
    Unimplemented = "unimplemented",

    /**
     * Internal errors. Means some invariants expected by underlying
     * system has been broken. If you see one of these errors,
     * something is very broken.
     *
     * This error code will be generated by the gRPC framework in several
     * internal error conditions.
     */
    Internal = "internal",

    /**
     * Unavailable indicates the service is currently unavailable.
     * This is a most likely a transient condition and may be corrected
     * by retrying with a backoff. Note that it is not always safe to retry
     * non-idempotent operations.
     *
     * See litmus test above for deciding between FailedPrecondition,
     * Aborted, and Unavailable.
     *
     * This error code will be generated by the gRPC framework during
     * abrupt shutdown of a server process or network connection.
     */
    Unavailable = "unavailable",

    /**
     * DataLoss indicates unrecoverable data loss or corruption.
     *
     * This error code will not be generated by the gRPC framework.
     */
    DataLoss = "data_loss",

    /**
     * Unauthenticated indicates the request does not have valid
     * authentication credentials for the operation.
     *
     * The gRPC framework will generate this error code when the
     * authentication metadata is invalid or a Credentials callback fails,
     * but also expect authentication middleware to generate it.
     */
    Unauthenticated = "unauthenticated",
}

// Create client only if backend URL is available, otherwise use a dummy URL for development
const backendUrl = import.meta.env.VITE_CLIENT_TARGET || "http://localhost:4000/api";
export default new Client(backendUrl, { requestInit: { credentials: "include" } });

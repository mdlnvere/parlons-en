<?php
/*
Plugin Name: Category Image Custom
Description: Ajoute une image aux catégories
*/

/* =========================
   CORS
========================= */
function nuanci_cors_headers() {
    $allowed_origins = [
        'http://localhost:5173',
        'https://app.nuanci.fr'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Vary: Origin");
    }
}
add_action('send_headers', 'nuanci_cors_headers');


/* =========================
   ADMIN FIELD
========================= */
function add_category_image_field($term) {
    $image = get_term_meta($term->term_id, 'category_image_id', true);
    ?>
    <tr class="form-field">
        <th scope="row"><label>Image</label></th>
        <td>
            <input type="text" name="category_image_id" id="category_image_id"
                   value="<?php echo esc_attr($image); ?>">
            <p>ID de l'image (media library)</p>
        </td>
    </tr>
    <?php
}
add_action('category_edit_form_fields', 'add_category_image_field');
add_action('category_add_form_fields', 'add_category_image_field');


/* =========================
   SAVE FIELD
========================= */
function save_category_image($term_id) {
    if (isset($_POST['category_image_id'])) {
        update_term_meta(
            $term_id,
            'category_image_id',
            intval($_POST['category_image_id'])
        );
    }
}
add_action('edited_category', 'save_category_image');
add_action('created_category', 'save_category_image');


/* =========================
   REST API
========================= */
function add_category_image_to_api($response, $term, $request) {
    $image_id = get_term_meta($term->term_id, 'category_image_id', true);
    $image_url = wp_get_attachment_image_url($image_id, 'medium');

    $response->data['category_image'] = $image_url;

    return $response;
}
add_filter('rest_prepare_category', 'add_category_image_to_api', 10, 3);